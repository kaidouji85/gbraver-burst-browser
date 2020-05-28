// @flow

import '../css/style.css';
import {Game} from './game/index';
import {ProductionResourcePath} from "./resource/path/production-resource-path";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    const resourcePath = new ProductionResourcePath();
    const game = new Game(resourcePath);
    await game.initialize();
  } catch(e) {
    throw e;
  }
}

window.addEventListener('load', () => {
  main();
});