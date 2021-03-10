// @flow

import '../css/style.css';
import {Game} from './game/index';
import {ProductionResourceRoot} from "./resource/root/production-resource-root";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  const resourceRoot = new ProductionResourceRoot();
  const game = new Game(resourceRoot);
  await game.initialize();
}

window.addEventListener('load', () => {
  main();
});
export {toUnSubscriber} from "./stream/rxjs";
export {toStream} from "./stream/rxjs";