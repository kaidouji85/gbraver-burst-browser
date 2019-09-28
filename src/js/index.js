// @flow

import * as THREE from 'three';
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {viewPerformanceStats} from "./stats/view-performance-stats";
import {loadAllResource} from "./resource";
import {Game} from "./game";
import {Loading} from "./loading/loading";
import {willServiceWorkerUpdate} from "./service-worker/will-service-worker-update";
import {Subject} from "rxjs";
import type {LoadingAction} from "./action/loading/loading";
import {LoadingActionCreator} from "./action/loading/loading-action-creator";
import type {ServiceWorkerAction} from "./action/service-worker/service-worker";
import {render} from 'react-dom';
import {resourceBasePath} from "./resource/resource-base-path";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    viewPerformanceStats(document.body);
    const loadingSubject: Subject<LoadingAction> = new Subject();
    const serviceWorkerSubject: Subject<ServiceWorkerAction> = new Subject();
    const loading = new Loading({
      listener: {
        loading: loadingSubject
      }
    });

    const sw = await loadServiceWorker();
    if (sw && willServiceWorkerUpdate(sw)) {
      serviceWorkerSubject.next({type: 'ServiceWorkerWillUpdate'});
      return;
    }

    new LoadingActionCreator(THREE.DefaultLoadingManager, loadingSubject);
    const resources = await loadAllResource(`${resourceBasePath()}/`);
    new Game(resources);
  } catch (e) {
    console.error(e.stack);
  }
}

window.onload = main;