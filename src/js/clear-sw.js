// @flow

import {unregisterServiceWorker} from "./service-worker/unregister-service-worker";
import {clearCache} from "./service-worker/clear-chache";

/**
 * ServiceWorkerクリアページスクリプトのエントリポイント
 */
function main() {
  Promise.all([
    unregisterServiceWorker(),
    clearCache()
  ]);
}

window.onload = main;