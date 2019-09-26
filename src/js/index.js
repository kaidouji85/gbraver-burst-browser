// @flow
import * as THREE from 'three';
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {viewPerformanceStats} from "./stats/view-performance-stats";
import {loadAllResource} from "./resource";
import {Game} from "./game";
import {Loading} from "./loading/loading";
import {willServiceWorkerUpdate} from "./service-worker/will-service-worker-update";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    viewPerformanceStats(document.body);
    const loading = new Loading();

    const sw = await loadServiceWorker();
    if (sw && willServiceWorkerUpdate(sw)) {
      console.log("service worker will update!!");
      return;
    }

    loading.start(THREE.DefaultLoadingManager);
    const resources = await loadAllResource(`${GBRAVER_BURST_RESOURCE_HASH}/`);
    new Game(resources);
  } catch (e) {
    console.error(e.stack);
  }
}

window.onload = main;