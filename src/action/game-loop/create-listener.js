// @flow

import type {GameLoop} from "./game-loop";
import {Observable, Subject} from "rxjs";

/**
 * ゲームループのリスナーを生成する
 *
 * @return ゲームループのリスナー
 */
export function createGameLoopListener(): Observable<GameLoop> {
  const listener: Subject<GameLoop> = new Subject();
  const gameLoop = (time: DOMHighResTimeStamp) => {
    requestAnimationFrame(gameLoop);
    listener.next({
      type: 'GameLoop',
      time: time
    });
  };
  requestAnimationFrame(gameLoop);

  return listener;
}
