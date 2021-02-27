// @flow

import {Observable, Subject} from "rxjs";

/** ゲームループ */
export type GameLoop = {
  type: 'GameLoop',
  time: DOMHighResTimeStamp
};

/**
 * ゲームループのリスナーを生成する
 *
 * @return ゲームループのリスナー
 */
export function gameLoopStream(): Observable<GameLoop> {
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