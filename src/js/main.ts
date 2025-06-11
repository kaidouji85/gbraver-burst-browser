import "../css/style.css";

import {
  createBrowserSDK,
  initializeBrowserSDK,
} from "@gbraver-burst-network/browser-sdk";
import * as THREE from "three";

import { isMobile } from "./device-ditect/is-mobile";
import { Game } from "./game";
import { createLocalStorageConfigRepository } from "./game/config/repository/local-storage";

/** webpack.config.js Webpack Define Pluginで定義したグローバル変数 */
declare let GBRAVER_BURST_DESKTOP_RESOURCE_ROOT: string;
declare let GBRAVER_BURST_MOBILE_RESOURCE_ROOT: string;
declare let GBRAVER_BURST_OWN_ROOT_URL: string;
declare let GBRAVER_BURST_HOW_TO_PLAY_URL: string;
declare let GBRAVER_BURST_CHARACTER_DESCRIPTION_URL: string;
declare let GBRAVER_BURST_TERMS_OF_SERVICE_URL: string;
declare let GBRAVER_BURST_PRIVACY_POLICY_URL: string;
declare let GBRAVER_BURST_CONTACT_URL: string;
declare let GBRAVER_BURST_WEBSOCKET_API_URL: string;
declare let GBRAVER_BURST_IS_SERVICE_WORKER_USED: string;
declare let GBRAVER_BURST_IS_API_SERVER_ENABLE: string;
declare let GBRAVER_BURST_COGNITO_USER_POOL_ID: string;
declare let GBRAVER_BURST_COGNITO_CLIENT_ID: string;
declare let GBRAVER_BURST_COGNITO_HOSTED_UI_DOMAIN: string;
declare let GBRAVER_BURST_CAN_PLAY_EPISODE_IN_DEVELOPMENT: string;
declare let GBRAVER_BURST_CAN_PLAY_DEVELOPING_ARMDOZER: string;
declare let GBRAVER_BURST_CAN_PLAY_DEVELOPING_PILOT: string;
declare let GBRAVER_BURST_IS_TITLE_HELP_ICON_ENABLE: string;

/** モバイル用リソースルート */
const mobileResourceRoot = { get: () => GBRAVER_BURST_MOBILE_RESOURCE_ROOT };

/** デスクトップ用リソースルート */
const desktopResourceRoot = { get: () => GBRAVER_BURST_DESKTOP_RESOURCE_ROOT };

THREE.ColorManagement.enabled = false;

/**
 * Gブレイバーバーストのエントリポイント
 */
export async function main(): Promise<void> {
  initializeBrowserSDK({
    userPoolId: GBRAVER_BURST_COGNITO_USER_POOL_ID,
    userPoolClientId: GBRAVER_BURST_COGNITO_CLIENT_ID,
    hostedUIDomain: GBRAVER_BURST_COGNITO_HOSTED_UI_DOMAIN,
    ownURL: GBRAVER_BURST_OWN_ROOT_URL,
  });
  const api = await createBrowserSDK(GBRAVER_BURST_WEBSOCKET_API_URL);
  const resourceRoot = isMobile() ? mobileResourceRoot : desktopResourceRoot;
  const game = new Game({
    resourceRoot,
    api: api,
    config: createLocalStorageConfigRepository(),
    howToPlayURL: GBRAVER_BURST_HOW_TO_PLAY_URL,
    characterDescriptionURL: GBRAVER_BURST_CHARACTER_DESCRIPTION_URL,
    termsOfServiceURL: GBRAVER_BURST_TERMS_OF_SERVICE_URL,
    privacyPolicyURL: GBRAVER_BURST_PRIVACY_POLICY_URL,
    contactURL: GBRAVER_BURST_CONTACT_URL,
    isServiceWorkerUsed: GBRAVER_BURST_IS_SERVICE_WORKER_USED === "true",
    isAPIServerEnable: GBRAVER_BURST_IS_API_SERVER_ENABLE === "true",
    canPlayEpisodeInDevelopment:
      GBRAVER_BURST_CAN_PLAY_EPISODE_IN_DEVELOPMENT === "true",
    canPlayDevelopingArmdozer:
      GBRAVER_BURST_CAN_PLAY_DEVELOPING_ARMDOZER === "true",
    canPlayDevelopingPilot: GBRAVER_BURST_CAN_PLAY_DEVELOPING_PILOT === "true",
    isTitleHelpIconEnable: GBRAVER_BURST_IS_TITLE_HELP_ICON_ENABLE === "true",
  });
  await game.initialize();
}
