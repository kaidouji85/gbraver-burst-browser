// @flow

import '../css/style.css';
import {Game} from './game/index';
import {DefinePlugin} from "./webpack/define-plugin";
import {createBrowserSDK} from "@gbraver-burst-network/browser-sdk";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  const api = await createBrowserSDK(DefinePlugin.ownURL, DefinePlugin.apiServerURL,
    DefinePlugin.auth0Domain, DefinePlugin.auth0ClientId, DefinePlugin.auth0AudienceId);
  if(api.isLoginSuccessRedirect()) {
    await api.afterLoginSuccess();
  }

  const game = new Game({
    resourceRoot: {
      get: () => DefinePlugin.resourceHash
    },
    api: api,
    howToPlayMovieURL: DefinePlugin.howToPlay,
    isPerformanceStatsVisible: DefinePlugin.isPerformanceStatsVisible === 'true',
    isServiceWorkerUsed: DefinePlugin.isServiceWorkerUsed === 'true',
    canCasualMatch: DefinePlugin.isAPIServerEnable === 'true',
  });
  await game.initialize();
}

window.addEventListener('load', () => {
  main();
});