// @flow

import '../css/style.css';
import {Game} from './game/index';
import {DefinePlugin} from "./webpack/define-plugin";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  const resourceRoot = {
    get: () => DefinePlugin.resourceHash
  }
  const game = new Game(resourceRoot);
  await game.initialize();
}

window.addEventListener('load', () => {
  main();
});