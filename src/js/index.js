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

export class GameStream {
  serviceWorker: Subject<ServiceWorkerAction>;
  loading: Observable<LoadingAction>;

  constructor() {
    this.serviceWorker = new Subject();
    this.loading = createLoadingActionListener(THREE.DefaultLoadingManager);
  }
}

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
    this._subscription = [];
  }

  async start(): Promise<void> {
    try {
      if (isDevelopment()) {
        viewPerformanceStats(document.body);
      }
      const serviceWorker = await loadServiceWorker();
      if (serviceWorker) {
        // TODO アプリ終了時にSubscriptionを破棄する
        createServiceWorkerActionListener(serviceWorker)
          .subscribe(this._stream.serviceWorker);
      }

      const resources = await loadAllResource(`${resourceBasePath()}/`);
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
    if (isDevelopment()) {
      viewPerformanceStats(document.body);
    }

    const serviceWorkerAction: Subject<ServiceWorkerAction> = new Subject();
    const loadingAction: Observable<LoadingAction> = createLoadingActionListener(THREE.DefaultLoadingManager);

    const components = new Components({
      listener: {
        loading: loadingAction,
        serviceWorker: serviceWorkerAction
      }
    });

    const serviceWorker = await loadServiceWorker();
    if (serviceWorker) {
      // TODO アプリ終了時にSubscriptionを破棄する
      createServiceWorkerActionListener(serviceWorker)
        .subscribe(serviceWorkerAction);
    }

    const resources = await loadAllResource(`${resourceBasePath()}/`);
    const threeJSCanvas = new ThreeJSCanvas();
  } catch(e) {
    throw e;
  }
}

window.onload = () => {
  main();
};