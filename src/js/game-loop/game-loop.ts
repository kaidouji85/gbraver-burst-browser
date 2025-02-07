import { map, Observable, Subject, tap } from "rxjs";

import { GlobalTweenGroup } from "../animation/global-tween-group";

/** ゲームループ */
export type GameLoop = {
  type: "GameLoop";
  time: number;
};

/**
 * ゲームループのストリームを生成する
 * 本ストリームは全体で1つのみ生成すること
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
    // 各ゲームオブジェクト、シーンはグローバルTweenの更新後にゲームループを受け取るようにしたい
    // そのため、ここでグローバルTweenの更新を行う
    tap((gameLoop) => GlobalTweenGroup.update(gameLoop.time)),
  );
}
