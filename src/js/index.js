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

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    viewPerformanceStats(document.body);
    const loadingSubject: Subject<LoadingAction> = new Subject();
    const loading = new Loading(loadingSubject);

    const sw = await loadServiceWorker();
    if (sw && willServiceWorkerUpdate(sw)) {
      console.log("service worker will update!!");
      return;
    }

    new LoadingActionCreator(THREE.DefaultLoadingManager, loadingSubject);
    const resources = await loadAllResource(`${GBRAVER_BURST_RESOURCE_HASH}/`);
    new Game(resources);
  } catch (e) {
    console.error(e.stack);
  }
}

window.onload = main;