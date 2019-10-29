// @flow

import '../css/index.css';

import {Observable, Subject, Subscription} from "rxjs";
import {Components} from "./components";
import {viewPerformanceStats} from "./stats/view-performance-stats";
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {loadAllResource} from "./resource";
import {resourceBasePath} from "./resource/resource-base-path";
import * as THREE from "three";
import {ThreeJSCanvas} from "./three-js-canvas";
import {isDevelopment} from "./webpack/mode";
import type {ServiceWorkerAction} from "./action/service-worker/service-worker";
import {createLoadingActionListener} from "./action/loading/create-listener";
import type {LoadingAction} from "./action/loading/loading";
import {createServiceWorkerActionListener} from "./action/service-worker/create-listener";
import type {Resources} from "./resource";
import type {EndTitle} from "./action/game/end-title";
import type {EndBattle} from "./action/game/end-battle";
import {createDummyBattleRoom} from "./battle-room/dummy-battle-room";

/** Gameで使用するストリーム */
export class GameStream {
  serviceWorker: Subject<ServiceWorkerAction>;
  loading: Observable<LoadingAction>;

  constructor() {
    this.serviceWorker = new Subject();
    this.loading = createLoadingActionListener(THREE.DefaultLoadingManager);
  }
}

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
        if(action.type === 'endBattle') {
          this._onEndBattle(action);
        } else if (action.type === 'EndTitle') {
          this._onEndTitle(action);
        }
      })
    ];
  }

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

      const resources = await loadAllResource(`${resourceBasePath()}/`);
      this._threeJSCanvas.bindTitle(resources);
      this._resources = resources;
    } catch(e) {
      throw e;
    }
  }

  async _onEndTitle(action: EndTitle) {
    try {
      if (!this._resources) {
        return;
      }
      const resources: Resources = this._resources;
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._threeJSCanvas.bindBattleScene(resources, room, initialState);
    } catch(e) {
      throw e;
    }
  }

  async _onEndBattle(action: EndBattle) {
    try {
      if (!this._resources) {
        return;
      }
      const resources: Resources = this._resources;
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._threeJSCanvas.bindBattleScene(resources, room, initialState);
    } catch(e) {
      throw e;
    }
  }
}

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    const game = new Game();
    await game.start();
  } catch(e) {
    throw e;
  }
}

window.onload = () => {
  main();
};