// @flow

import '../css/index.css';

import {Subject} from "rxjs";
import {OuterGame} from "./outer-game";
import {viewPerformanceStats} from "./stats/view-performance-stats";
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {ServiceWorkerActionCreator} from "./action/service-worker/service-worker-action-creator";
import {loadAllResource} from "./resource";
import {resourceBasePath} from "./resource/resource-base-path";
import {LoadingActionCreator} from "./action/loading/loading-action-creator";
import * as THREE from "three";
import {Game} from "./game";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    viewPerformanceStats(document.body);

    const subjects = {
      loading: new Subject(),
      serviceWorker: new Subject()
    };
    const outerGame = new OuterGame({
      listener: {
        loading: subjects.loading,
        serviceWorker: subjects.serviceWorker
      }
    });

    const serviceWorker = await loadServiceWorker();
    if (serviceWorker) {
      new ServiceWorkerActionCreator(subjects.serviceWorker, serviceWorker);
    }

    new LoadingActionCreator(THREE.DefaultLoadingManager, subjects.loading);
    const resources = await loadAllResource(`${resourceBasePath()}/`);
    new Game(resources);
  } catch(e) {
    throw e;
  }
}

window.onload = () => {
  main();
};