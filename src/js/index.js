// @flow

import '../css/style.css';
import {Game} from './game/index';
import {DefinePlugin} from "./webpack/define-plugin";
import {createBrowserSDK} from "@gbraver-burst-network/browser-sdk";
import {isMobile} from "./device-ditect/is-mobile";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  const api = await createBrowserSDK(DefinePlugin.ownURL, DefinePlugin.restAPIURL, DefinePlugin.websocketAPIURL,
    DefinePlugin.auth0Domain, DefinePlugin.auth0ClientId, DefinePlugin.auth0AudienceId);
  if(api.isLoginSuccessRedirect()) {
    await api.afterLoginSuccess();
  }
  
  const resourceRoot = isMobile()
    ? {get: () => DefinePlugin.mobileResourceRoot}
    : {get: () => DefinePlugin.desktopResourceRoot};
  const game = new Game({
    resourceRoot,
    api: api,
    howToPlayMovieURL: DefinePlugin.howToPlay,
    termsOfServiceURL: DefinePlugin.termsOfServiceURL,
    privacyPolicyURL: DefinePlugin.privacyPolicyURL,
    contactURL: DefinePlugin.contactURL,
    isPerformanceStatsVisible: DefinePlugin.isPerformanceStatsVisible === 'true',
    isServiceWorkerUsed: DefinePlugin.isServiceWorkerUsed === 'true',
    isAPIServerEnable: DefinePlugin.isAPIServerEnable === 'true',
  });
  await game.initialize();
}

window.addEventListener('load', () => {
  main();
});