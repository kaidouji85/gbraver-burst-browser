// @flow

import '../css/style.css';
import {Game} from './game/index';
import {invisibleFirstView} from "./first-view/first-view-visible";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    const game = new Game();
    await game.start();
    invisibleFirstView();
  } catch(e) {
    throw e;
  }
}

window.onload = () => {
  main();
};