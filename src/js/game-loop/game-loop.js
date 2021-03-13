// @flow

import {Observable, Subject} from "rxjs";
import type {Stream} from "../stream/core";
import {RxjsStreamSource} from "../stream/rxjs";

/** ゲームループ */
export type GameLoop = {
  type: 'GameLoop',
  time: DOMHighResTimeStamp
};

/**
 * @deprecated
 * ゲームループのリスナーを生成する
 *
 * @return ゲームループのリスナー
 */
export function deprecated_gameLoopStream(): Observable<GameLoop> {
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