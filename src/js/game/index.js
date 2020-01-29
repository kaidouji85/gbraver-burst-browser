// @flow

import {GameStream} from "./stream";
import {Components} from "./components";
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
import {CssVH} from "../view-port/vh";

/** ゲーム全体の管理を行う */
export class Game {
  _stream: GameStream;
  _components: Components;
  _resources: ?Resources;
  _subscription: Subscription[];

  constructor() {
    const vh = new CssVH();

    this._stream = new GameStream();
    this._components = new Components({
      listener: {
        loading: this._stream.loading,
        serviceWorker: this._stream.serviceWorker,
        startBattle:this._stream.startBattle,
      }
    });
    this._resources = null;
    this._subscription = [
      this._components.notifier().endTitle.subscribe(action => {
        this._onEndTitle(action);
      }),

      this._components.notifier().endBattle.subscribe(action => {
        this._onEndBattle(action);
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
      this._resources = resources;
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._stream.startBattle.next({
        type: 'StartBattle',
        resources: resources,
        room: room,
        initialState: initialState
      });
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

      const resources: Resources = this._resources;
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._stream.startBattle.next({
        type: 'StartBattle',
        resources: resources,
        room: room,
        initialState: initialState
      });
    } catch (e) {
      throw e;
    }
  }
}