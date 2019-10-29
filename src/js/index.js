// @flow

import '../css/index.css';
import {Game} from "./game";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    const game = new Game();
    await game.start();
  } catch(e) {
    throw e;
  }
}

window.onload = () => {
  main();
};