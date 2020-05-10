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
import {createInitialState} from "./state/initial-state";
import {endBattle} from "./state/end-battle";
import type {ResourcePath} from "../resource/path/resource-path";
import type {SelectionComplete} from "../action/game/selection-complete";
import {selectionComplete} from "./state/selectiin-complete";
import {waitAnimationFrame} from "../wait/wait-animation-frame";
import {PreLoadLinks} from "./preload-links";
import {getNPC} from "./state/npc";
import {waitTime} from "../wait/wait-time";
import {OfflineBattleRoom} from "../battle-room/offline-battle-room";
import {stageName} from "./state/stage-name";

/**
 * 対戦カード画面を表示する最小時間(ミリ秒)
 */
export const MIN_MATCH_CARD_VISIBLE_TIME = 3000;

/** ゲーム全体の管理を行う */
export class Game {
  _state: State;
  _loading: Observable<LoadingAction>;
  _resize: Observable<Resize>;
  _vh: CssVH;
  _preLoadLinks: PreLoadLinks;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _tdScenes: TDScenes;
  _resourcePath: ResourcePath;
  _resources: ?Resources;
  _serviceWorker: ?ServiceWorkerRegistration;
  _subscriptions: Subscription[];

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

  /** ゲームの初期化を行う */
  async initialize(): Promise<void> {
    try {
      this._domScenes.showTitle();
      if (isDevelopment()) {
        viewPerformanceStats(document.body);
      }
      this._serviceWorker = await loadServiceWorker();
    } catch (e) {
      throw e;
    }
  }

  /**
   * ゲームスタートボタンを押した
   */
  _onPushGameStart(action: PushGameStart) {
    this._domScenes.showPlayerSelect();
  }

  /**
   * 遊び方ボタンを押した
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
   * プレイヤー選択完了
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    try {
      this._domScenes.showLoading();
      const resources = await loadAllResource(`${this._resourcePath.get()}/`);
      this._resources = resources;
      await waitAnimationFrame();

      const startMatchCardTime = new Date().getTime();
      this._state = selectionComplete(this._state, action);
      const npc = getNPC(this._state);
      this._domScenes.showMatchCard(
        this._state.player.armdozer.id,
        npc.armdozer.id,
        stageName(this._state.level)
      );
      const room = new OfflineBattleRoom(this._state.player, npc);
      const initialState = await room.start();
      this._tdScenes.startBattle(resources, room, initialState);
      const startBattleTime = new Date().getTime();
      const remainingTime = MIN_MATCH_CARD_VISIBLE_TIME - (startBattleTime - startMatchCardTime);
      await waitTime(Math.max(0, remainingTime));

      this._domScenes.hidden();
    } catch (e) {
      throw e;
    }
  }

  /**
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle) {
    try {
      if (!this._resources) {
        return;
      }

      const startMatchCardTime = new Date().getTime();
      const resources: Resources = this._resources;
      this._state = endBattle(this._state, action);
      const npc = getNPC(this._state);
      this._domScenes.showMatchCard(
        this._state.player.armdozer.id,
        npc.armdozer.id,
        stageName(this._state.level)
      );
      const room = new OfflineBattleRoom(this._state.player, npc);
      const initialState = await room.start();
      this._tdScenes.startBattle(resources, room, initialState);
      const startBattleTime = new Date().getTime();
      const remainingTime = MIN_MATCH_CARD_VISIBLE_TIME - (startBattleTime - startMatchCardTime);
      await waitTime(Math.max(0, remainingTime));

      this._domScenes.hidden();
    } catch (e) {
      throw e;
    }
  }
}
