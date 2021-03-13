// @flow

import type {Stream} from "../stream/core";
import {RxjsStreamSource} from "../stream/rxjs";

/** ゲームループ */
export type GameLoop = {
  type: 'GameLoop',
  time: DOMHighResTimeStamp
};

/**
 * ゲームループのリスナーを生成する
 *
 * @return ゲームループストリーム
 */
export function gameLoopStream(): Stream<GameLoop> {
  const source = new RxjsStreamSource<GameLoop>();
  const gameLoop = (time: DOMHighResTimeStamp) => {
    requestAnimationFrame(gameLoop);
    source.next({
      type: 'GameLoop',
      time: time
    });
  };
  requestAnimationFrame(gameLoop);
  return source;
}