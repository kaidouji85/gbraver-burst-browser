import "../css/style.css";

import { createBrowserSDK } from "@gbraver-burst-network/browser-sdk";
import * as THREE from "three";

import { isMobile } from "./device-ditect/is-mobile";
import { createLocalStorageConfigRepository } from "./game/config/repository/local-storage";
import { Game } from "./game/index";

/** webpack.config.js Webpack Define Pluginで定義したグローバル変数 */
declare let GBRAVER_BURST_DESKTOP_RESOURCE_ROOT: string;
declare let GBRAVER_BURST_MOBILE_RESOURCE_ROOT: string;
declare let GBRAVER_BURST_OWN_ROOT_URL: string;
declare let GBRAVER_BURST_HOW_TO_PLAY: string;
declare let GBRAVER_BURST_TERMS_OF_SERVICE_URL: string;
declare let GBRAVER_BURST_PRIVACY_POLICY_URL: string;
declare let GBRAVER_BURST_CONTACT_URL: string;
declare let GBRAVER_BURST_REST_API_URL: string;
declare let GBRAVER_BURST_WEBSOCKET_API_URL: string;
declare let GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE: string;
declare let GBRAVER_BURST_IS_SERVICE_WORKER_USED: string;
declare let GBRAVER_BURST_IS_API_SERVER_ENABLE: string;
declare let GBRAVER_BURST_AUTH0_DOMAIN: string;
declare let GBRAVER_BURST_AUTH0_CLIENT_ID: string;
declare let GBRAVER_BURST_AUTH0_AUDIENCE: string;
declare let GBRAVER_BURST_CAN_PLAY_TUTORIAL_IN_DEVELOPMENT: string;
declare let GBRAVER_BURST_SHOULD_LOAD_DEVELOPING_RESOURCE: string;
declare let GBRAVER_BURST_CAN_PLAY_DEVELOPING_ARMDOZER: string;
declare let GBRAVER_BURST_CAN_PLAY_DEVELOPING_PILOT: string;

THREE.ColorManagement.enabled = false;

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  const api = await createBrowserSDK(
    GBRAVER_BURST_OWN_ROOT_URL,
    GBRAVER_BURST_REST_API_URL,
    GBRAVER_BURST_WEBSOCKET_API_URL,
    GBRAVER_BURST_AUTH0_DOMAIN,
    GBRAVER_BURST_AUTH0_CLIENT_ID,
    GBRAVER_BURST_AUTH0_AUDIENCE,
  );

  if (api.isLoginSuccessRedirect()) {
    await api.afterLoginSuccess();
  }

  const resourceRoot = isMobile()
    ? {
        get: () => GBRAVER_BURST_MOBILE_RESOURCE_ROOT,
      }
    : {
        get: () => GBRAVER_BURST_DESKTOP_RESOURCE_ROOT,
      };
  const game = new Game({
    resourceRoot,
    api: api,
    config: createLocalStorageConfigRepository(),
    howToPlayURL: GBRAVER_BURST_HOW_TO_PLAY,
    termsOfServiceURL: GBRAVER_BURST_TERMS_OF_SERVICE_URL,
    privacyPolicyURL: GBRAVER_BURST_PRIVACY_POLICY_URL,
    contactURL: GBRAVER_BURST_CONTACT_URL,
    isPerformanceStatsVisible:
      GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE === "true",
    isServiceWorkerUsed: GBRAVER_BURST_IS_SERVICE_WORKER_USED === "true",
    isAPIServerEnable: GBRAVER_BURST_IS_API_SERVER_ENABLE === "true",
    canPlayTutorialInDevelopment:
      GBRAVER_BURST_CAN_PLAY_TUTORIAL_IN_DEVELOPMENT === "true",
    shouldLoadDevelopingResource:
      GBRAVER_BURST_SHOULD_LOAD_DEVELOPING_RESOURCE === "true",
    canPlayDevelopingArmdozer:
      GBRAVER_BURST_CAN_PLAY_DEVELOPING_ARMDOZER === "true",
    canPlayDevelopingPilot:
      GBRAVER_BURST_CAN_PLAY_DEVELOPING_PILOT === "true",
  });
  await game.initialize();
}

window.addEventListener("load", () => {
  main();
});
