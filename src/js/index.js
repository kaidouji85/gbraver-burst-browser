// @flow

import '../css/style.css';
import {Game} from './game/index';
import {DefinePlugin} from "./webpack/define-plugin";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  const game = new Game({
    resourceRoot: {
      get: () => DefinePlugin.resourceHash
    },
    _howToPlayMovieURL: DefinePlugin.howToPlay,
    isPerformanceStatsVisible: DefinePlugin.isPerformanceStatsVisible === 'true',
    isServiceWorkerUsed: DefinePlugin.isServiceWorkerUsed === 'true',
  });
  await game.initialize();
}

window.addEventListener('load', () => {
  main();
});