// @flow

import {GameStream} from "./stream";
import {Components} from "../components";
import {ThreeJSCanvas} from "../three-js-canvas";
import type {Resources} from "../resource";
import {loadAllResource} from "../resource";
import {Subscription} from "rxjs";
import {isDevelopment} from "../webpack/mode";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import {createServiceWorkerActionListener} from "../action/service-worker/create-listener";
import {resourceBasePath} from "../resource/resource-base-path";
import type {EndTitle} from "../action/game/end-title";
import {createDummyBattleRoom} from "../battle-room/dummy-battle-room";
import type {EndBattle} from "../action/game/end-battle";

/** ゲーム全体の管理を行う */
export class Game {
  _stream: GameStream;
  _components: Components;
  _threeJSCanvas: ThreeJSCanvas;
  _resources: ?Resources;
  _subscription: Subscription[];

  constructor() {
    this._stream = new GameStream();
    this._components = new Components({
      listener: {
        loading: this._stream.loading,
        serviceWorker: this._stream.serviceWorker
      }
    });
    this._threeJSCanvas = new ThreeJSCanvas();
    this._resources = null;
    this._subscription = [
      this._threeJSCanvas.notifier().gameAction.subscribe(action => {
        if (action.type === 'endBattle') {
          this._onEndBattle(action);
        }
      }),

      this._components.notifier().endTitle.subscribe(action => {
        this._onEndTitle(action);
      })
    ];
  }

  /** ゲームを開始する */
  async start(): Promise<void> {
    try {
      if (isDevelopment()) {
        viewPerformanceStats(document.body);
      }
      const serviceWorker = await loadServiceWorker();
      if (serviceWorker) {
        this._subscription = [
          ...this._subscription,
          createServiceWorkerActionListener(serviceWorker)
            .subscribe(this._stream.serviceWorker)
        ];
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * タイトル終了時の処理
   *
   * @param action アクション
   */
  async _onEndTitle(action: EndTitle) {
    try {
      const resources = await loadAllResource(`${resourceBasePath()}/`);
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._threeJSCanvas.bindBattleScene(resources, room, initialState);
      this._resources = resources;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 先頭終了時の処理
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
      const initialState = await room.start();
      this._threeJSCanvas.bindBattleScene(resources, room, initialState);
    } catch (e) {
      throw e;
    }
  }
}