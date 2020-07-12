// @flow

import '../css/style.css';
import {Game} from './game/index';
import {ProductionResourceRoot} from "./resource/root/production-resource-root";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    const resourceRoot = new ProductionResourceRoot();
    const game = new Game(resourceRoot);
    await game.initialize();
  } catch(e) {
    throw e;
  }
}

window.addEventListener('load', () => {
  main();
});