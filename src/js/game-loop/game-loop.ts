import { map, Observable, Subject, tap } from "rxjs";

import { GlobalTweenGroup } from "../animation/global-tween-group";
import { GameLoopTime } from "./game-loop-time";

/** ゲームループ */
export type GameLoop = {
  type: "GameLoop";
  time: number;
};

/**
 * ゲームループのストリームを生成する
 * 本ストリームは全体で1つのみ生成すること
 * @param gameLoopTime ゲームループの時間管理オブジェクト
 * @returns ゲームループストリーム
 */
export function createGameLoop(gameLoopTime: GameLoopTime): Observable<GameLoop> {
  const source = new Subject<number>();
  const gameLoop = (time: number) => {
    requestAnimationFrame(gameLoop);
    source.next(time);
  };
  requestAnimationFrame(gameLoop);

  return source.pipe(
    map((time): GameLoop => {
      gameLoopTime.tick(time);
      return { type: "GameLoop", time: gameLoopTime.get() };
    }),
    // 各ゲームオブジェクト、シーンはグローバルTweenの更新後にゲームループを受け取るようにしたい
    // そのため、ここでグローバルTweenの更新を行う
    tap((gameLoop) => GlobalTweenGroup.update(gameLoop.time)),
  );
}
