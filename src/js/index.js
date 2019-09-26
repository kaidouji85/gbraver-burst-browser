// @flow
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {viewPerformanceStats} from "./stats/view-performance-stats";
import {loadAllResource} from "./resource";
import {addEventToLoadingManager} from "./loading/loading-dom";
import {Game} from "./game";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    addEventToLoadingManager();
    viewPerformanceStats(document.body);
    const sw = await loadServiceWorker();
    if (sw && willUpdate(sw)) {
      console.log("service worker will update!!");
      return;
    }
    const resources = await loadAllResource(`${GBRAVER_BURST_RESOURCE_HASH}/`);
    new Game(resources);
  } catch (e) {
    console.error(e.stack);
  }
}

function willUpdate(sw: ServiceWorkerRegistration): boolean {
  const hasActiveSW = sw.active !== null;
  const hasInstallingSW = sw.installing !== null;
  const hasWaitingSW = sw.waiting !== null;

  return hasActiveSW && (!hasInstallingSW || !hasWaitingSW);
}

window.onload = main;