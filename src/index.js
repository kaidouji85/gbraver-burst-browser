// @flow
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {viewPerformanceStatics} from "./stats/view-performance-statics";
import {loadAllResource} from "./resource";
import {addEventToLoadingManager} from "./loading/loading-dom";
import {Game} from "./game";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    addEventToLoadingManager();
    loadServiceWorker();
    viewPerformanceStatics(document.body);
    const resources = await loadAllResource(`${GBRAVER_BURST_RESOURCE_HASH}/`);
    new Game(resources);
  } catch (e) {
    console.error(e.stack);
  }
}

window.onload = main;