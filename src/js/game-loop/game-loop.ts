import { map, Observable, Subject, tap } from "rxjs";

import { GlobalTweenGroup } from "../animation/global-tween-group";

/** ゲームループ */
export type GameLoop = {
  type: "GameLoop";
  time: number;
};

/**
 * ゲームループのストリームを生成する
 * @returns ゲームループストリーム
 */
export function createGameLoop(): Observable<GameLoop> {
  const source = new Subject<number>();
  const gameLoop = (time: number) => {
    requestAnimationFrame(gameLoop);
    source.next(time);
  };
  requestAnimationFrame(gameLoop);

  return source.pipe(
    map((time): GameLoop => ({ type: "GameLoop", time })),
    tap((gameLoop) => GlobalTweenGroup.update(gameLoop.time)),
  );
}
