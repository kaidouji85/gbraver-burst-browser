import { clearCache } from "./service-worker/clear-chache";
import { unregisterServiceWorker } from "./service-worker/unregister-service-worker";

/**
 * ServiceWorkerクリアページスクリプトのエントリポイント
 */
function main() {
  Promise.all([unregisterServiceWorker(), clearCache()]);
}

window.onload = main;