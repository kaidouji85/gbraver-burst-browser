// @flow

import {Game} from './game/index';

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