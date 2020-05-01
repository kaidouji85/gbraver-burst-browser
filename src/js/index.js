// @flow

import '../css/style.css';
import {Game} from './game/index';
import {invisibleFirstView} from "./first-view/first-view-visible";
import {ProductionResourcePath} from "./resource/path/production-resource-path";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    const resourcePath = new ProductionResourcePath();
    const game = new Game(resourcePath);
    await game.initialize();
    invisibleFirstView();
  } catch(e) {
    throw e;
  }
}

window.addEventListener('load', () => {
  main();
});