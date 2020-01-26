// @flow

import '../css/style.css';
import {Game} from './game/index';
import {invisibleFirstView} from "./first-view/first-view-visible";
import {setVH} from "./view-port/css-custom-property";

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

window.addEventListener('load', () => {
  setVH();
  main();
});

window.addEventListener('resize', () => {
  setVH();
});