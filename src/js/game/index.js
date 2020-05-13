// @flow

import * as THREE from 'three';
import {DOMScenes} from "./dom-scenes";
import type {Resources} from "../resource";
import {loadAllResource} from "../resource";
import {Observable, Subscription} from "rxjs";
import {isDevelopment} from "../webpack/mode";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import type {EndBattle} from "../action/game/battle";
import {CssVH} from "../view-port/vh";
import {TDScenes} from "./td-scenes";
import type {LoadingAction} from "../action/loading/loading";
import {createLoadingActionListener} from "../action/loading/create-listener";
import type {Resize} from "../action/resize/resize";
import {createResizeStream} from "../action/resize/resize";
import {InterruptScenes} from "./innterrupt-scenes";
import type {EndHowToPlay} from "../action/game/how-to-play";
import {DOMDialogs} from "./dom-dialogs";
import type {PushGameStart, PushHowToPlay} from "../action/game/title";
import type {State} from "./state/state";
import {createInitialState} from "./state/state";
import type {ResourcePath} from "../resource/path/resource-path";
import type {SelectionComplete} from "../action/game/selection-complete";
import {waitAnimationFrame} from "../wait/wait-animation-frame";
import {PreLoadLinks} from "./preload-links";
import type {NPCBattle} from "./state/npc-battle/npc-battle";
import {createInitialNPCBattle} from "./state/npc-battle/npc-battle";
import {selectionComplete} from "./state/npc-battle/selection-complete";
import {endBattle} from "./state/npc-battle/end-battle";
import {npcBattleFlow} from "./flow/npc-battle";
import {waitTime} from "../wait/wait-time";
import {DOMFader} from "../components/dom-fader/dom-fader";

/**
 * ゲーム全体の管理を行う
 */
export class Game {
  _state: State;
  _loading: Observable<LoadingAction>;
  _resize: Observable<Resize>;
  _vh: CssVH;
  _preLoadLinks: PreLoadLinks;
  _fader: DOMFader;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _tdScenes: TDScenes;
  _resourcePath: ResourcePath;
  _resources: ?Resources;
  _serviceWorker: ?ServiceWorkerRegistration;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._resourcePath = resourcePath;

    this._state = createInitialState();
    this._loading = createLoadingActionListener(THREE.DefaultLoadingManager);
    this._resize = createResizeStream();
    this._vh = new CssVH(this._resize);

    this._preLoadLinks = new PreLoadLinks(resourcePath);
    const head = document.head ?? document.createElement('head');
    this._preLoadLinks.getLinks().forEach(link => {
      head.appendChild(link);
    });

    this._fader = new DOMFader();

    this._interruptScenes = new InterruptScenes({
      resourcePath: this._resourcePath,
    });
    this._domScenes = new DOMScenes({
      resourcePath: this._resourcePath,
      loading: this._loading,
    });
    this._domDialogs = new DOMDialogs();
    this._tdScenes = new TDScenes(this._resize);

    const body = document.body || document.createElement('div');
    const elements = [
      this._fader.getRootHTMLElement(),
      ...this._interruptScenes.getRootHTMLElements(),
      ...this._domDialogs.getRootHTMLElements(),
      this._domScenes.getRootHTMLElement(),
      this._tdScenes.getRendererDOM(),
    ];
    elements.forEach(element => {
      body.appendChild(element);
    });

    this._resources = null;
    this._serviceWorker = null;

    const domScenesNotifier = this._domScenes.notifier();
    const domDialogNotifier = this._domDialogs.notifier();
    const tdNotifier = this._tdScenes.notifier();
    this._subscriptions = [
      domScenesNotifier.pushGameStart.subscribe(action => {
        this._onPushGameStart(action);
      }),
      domScenesNotifier.pushHowToPlay.subscribe(action => {
        this._onPushHowToPlay(action);
      }),
      domDialogNotifier.endHowToPlay.subscribe(action => {
        this._onEndHowToPlay(action);
      }),
      tdNotifier.endBattle.subscribe(action => {
        this._onEndBattle(action);
      }),
      domScenesNotifier.selectionComplete.subscribe(action => {
        this._onSelectionComplete(action);
      })
    ];
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理結果
   */
  async initialize(): Promise<void> {
    try {
      if (isDevelopment()) {
        viewPerformanceStats(document.body);
      }

      this._domScenes.showTitle();
      this._serviceWorker = await loadServiceWorker();
      await this._fader.fadeIn();
    } catch (e) {
      throw e;
    }
  }

  /**
   * ゲームスタートボタンを押した際の処理
   *
   * @param action アクション
   */
  async _onPushGameStart(action: PushGameStart) {
    try {
      await this._fader.fadeOut();
      this._state.inProgress = createInitialNPCBattle();
      this._domScenes.showPlayerSelect();
      await this._fader.fadeIn();
    } catch(e) {
      throw e;
    }
  }

  /**
   * 遊び方ボタンを押した際の処理
   *
   * @param action アクション
   */
  _onPushHowToPlay(action: PushHowToPlay) {
    this._domDialogs.showHowToPlay();
  }

  /**
   * 遊び方シーン終了
   *
   * @param action アクション
   */
  _onEndHowToPlay(action: EndHowToPlay) {
    this._domDialogs.hidden();
  }

  /**
   * プレイヤーキャラクター 選択完了時の処理
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    try {
      if (this._state.inProgress.type === 'NPCBattle') {
        const origin: NPCBattle = this._state.inProgress;
        const updated: NPCBattle = selectionComplete(origin, action);
        this._state.inProgress = updated;
        const resources: Resources = await this._getOrLoadResources();
        await npcBattleFlow(resources, updated, this._domScenes, this._tdScenes);
      }
    } catch(e) {
      throw e;
    }
  }

  /**
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    try {
      if (this._state.inProgress.type === 'NPCBattle') {
        const resources: Resources = await this._getOrLoadResources();
        const origin: NPCBattle = this._state.inProgress;
        const updated: NPCBattle = endBattle(origin, action);
        this._state.inProgress = updated;
        await npcBattleFlow(resources, updated, this._domScenes, this._tdScenes);
      }
    } catch(e) {
      throw e;
    }
  }

  /**
   * リソース管理オブジェクトの取得する
   * ロードされていない場合は、本メソッド内でロードを行い結果を返す
   * 
   * @return リソース管理オブジェクト
   */
  async _getOrLoadResources(): Promise<Resources> {
    try {
      if (this._resources) {
        const ret: Resources = this._resources;
        return ret;
      }

      this._domScenes.showLoading();
      const resources = await loadAllResource(`${this._resourcePath.get()}/`);
      this._resources = resources;
      await waitAnimationFrame();
      await waitTime(3000);
      return resources;
    } catch(e) {
      throw e;
    }
  }
}
