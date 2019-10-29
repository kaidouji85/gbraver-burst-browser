// @flow

import '../css/index.css';

import {Observable, Subject} from "rxjs";
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