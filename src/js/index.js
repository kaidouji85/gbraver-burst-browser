// @flow

import '../css/style.css';
import {Game} from './game/index';
import {createBrowserSDK} from "@gbraver-burst-network/browser-sdk";
import {isMobile} from "./device-ditect/is-mobile";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  const api = await createBrowserSDK(GBRAVER_BURST_OWN_ROOT_URL, GBRAVER_BURST_REST_API_URL, GBRAVER_BURST_WEBSOCKET_API_URL,
    GBRAVER_BURST_AUTH0_DOMAIN, GBRAVER_BURST_AUTH0_CLIENT_ID, GBRAVER_BURST_AUTH0_AUDIENCE);
  if(api.isLoginSuccessRedirect()) {
    await api.afterLoginSuccess();
  }
  
  const resourceRoot = isMobile()
    ? {get: () => GBRAVER_BURST_MOBILE_RESOURCE_ROOT}
    : {get: () => GBRAVER_BURST_DESKTOP_RESOURCE_ROOT};
  const game = new Game({
    resourceRoot,
    api: api,
    howToPlayMovieURL: GBRAVER_BURST_HOW_TO_PLAY,
    termsOfServiceURL: GBRAVER_BURST_TERMS_OF_SERVICE_URL,
    privacyPolicyURL: GBRAVER_BURST_PRIVACY_POLICY_URL,
    contactURL: GBRAVER_BURST_CONTACT_URL,
    isPerformanceStatsVisible: GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE === 'true',
    isServiceWorkerUsed: GBRAVER_BURST_IS_SERVICE_WORKER_USED === 'true',
    isAPIServerEnable: GBRAVER_BURST_IS_API_SERVER_ENABLE === 'true',
  });
  await game.initialize();
}

window.addEventListener('load', () => {
  main();
});