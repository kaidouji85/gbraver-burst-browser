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
import {createBattleRoom} from "./state/battle-room";
import {endBattle} from "./state/end-battle";
import type {ResourcePath} from "../resource/path/resource-path";
import type {SelectionComplete} from "../action/player-select/selection-complete";
import {selectionComplete} from "./state/selectiin-complete";
import {waitAnimationFrame} from "../animation-frame/wait-animation-frame";

/** ゲーム全体の管理を行う */
export class Game {
  _state: State;
  _loading: Observable<LoadingAction>;
  _resize: Observable<Resize>;
  _vh: CssVH;
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

    this._interruptScenes = new InterruptScenes({
      resourcePath: this._resourcePath,
      loading: this._loading,
    });
    this._domScenes = new DOMScenes({
      resourcePath: this._resourcePath
    });
    this._domDialogs = new DOMDialogs();
    this._tdScenes = new TDScenes(this._resize);

    const body = document.body || document.createElement('div');
    const elements = [
      ...this._interruptScenes.getRootHTMLElements(),
      ...this._domDialogs.getRootHTMLElements(),
      ...this._domScenes.getRootHTMLElements(),
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
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle) {
    try {
      if (!this._resources) {
        return;
      }
      const resources: Resources = this._resources;

      this._state = endBattle(this._state, action);
      const room = createBattleRoom(this._state);
      const initialState = await room.start();

      this._tdScenes.startBattle(resources, room, initialState);
    } catch (e) {
      throw e;
    }
  }

  /**
   * プレイヤー選択完了
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    try {
      this._state = selectionComplete(this._state, action);

      this._domScenes.hidden();
      this._interruptScenes.showLoading();

      const resources = await loadAllResource(`${this._resourcePath.get()}/`);
      this._resources = resources;
      const room = createBattleRoom(this._state);
      const initialState = await room.start();
      await waitAnimationFrame();

      this._tdScenes.startBattle(resources, room, initialState);
      await waitAnimationFrame();
      this._interruptScenes.hiddenLoading();
    } catch (e) {
      throw e;
    }
  }
}
