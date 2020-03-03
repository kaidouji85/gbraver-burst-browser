// @flow

import * as THREE from 'three';
import {DOMScenes} from "./dom-scenes";
import type {Resources} from "../resource";
import {loadAllResource} from "../resource";
import {Observable, Subject, Subscription} from "rxjs";
import {isDevelopment} from "../webpack/mode";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import {createServiceWorkerActionListener} from "../action/service-worker/create-listener";
import {resourceBasePath} from "../resource/resource-base-path";
import {createDummyBattleRoom} from "../battle-room/dummy-battle-room";
import type {EndBattle} from "../action/game/battle";
import {CssVH} from "../view-port/vh";
import {TDScenes} from "./td-scenes";
import type {ServiceWorkerAction} from "../action/service-worker/service-worker";
import type {LoadingAction} from "../action/loading/loading";
import {createLoadingActionListener} from "../action/loading/create-listener";
import type {Resize} from "../action/resize/resize";
import {createResizeStream} from "../action/resize/resize";
import {InterruptScenes} from "./innterrupt-scenes";
import type {EndHowToPlay} from "../action/game/how-to-play";
import {DOMDialogs} from "./dom-dialogs";
import type {PushGameStart, PushHowToPlay} from "../action/game/title";

/** ゲーム全体の管理を行う */
export class Game {
  _serviceWorkerStream: Subject<ServiceWorkerAction>;
  _loading: Observable<LoadingAction>;
  _resize: Observable<Resize>;
  _vh: CssVH;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _tdScenes: TDScenes;
  _resources: ?Resources;
  _subscriptions: Subscription[];

  constructor() {
    this._serviceWorkerStream = new Subject<ServiceWorkerAction>();
    this._loading = createLoadingActionListener(THREE.DefaultLoadingManager);
    this._resize = createResizeStream();

    this._vh = new CssVH(this._resize);

    this._interruptScenes = new InterruptScenes({
      listener: {
        loading: this._loading,
        serviceWorker: this._serviceWorkerStream,
      }
    });

    this._domScenes = new DOMScenes();

    this._domDialogs = new DOMDialogs();

    const body = document.body || document.createElement('div');
    this._tdScenes = new TDScenes(body, this._resize);

    this._resources = null;

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
      })
    ];
  }

  /** ゲームの初期化を行う */
  async initialize(): Promise<void> {
    try {
      if (isDevelopment()) {
        viewPerformanceStats(document.body);
      }
      const serviceWorker = await loadServiceWorker();
      if (serviceWorker) {
        this._subscriptions = [
          ...this._subscriptions,
          createServiceWorkerActionListener(serviceWorker)
            .subscribe(this._serviceWorkerStream)
        ];
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * ゲームスタートボタンを押した
   */
  async _onPushGameStart(action: PushGameStart) {
    try {
      this._domScenes.hidden();

      const resources = await loadAllResource(`${resourceBasePath()}/`);
      this._resources = resources;
      const room = createDummyBattleRoom();
      const initialState = room.start();
      this._tdScenes.startBattle(resources, room, initialState);
    } catch (e) {
      throw e;
    }
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
      const room = createDummyBattleRoom();
      const initialState = room.start();
      this._tdScenes.startBattle(resources, room, initialState);
    } catch (e) {
      throw e;
    }
  }
}