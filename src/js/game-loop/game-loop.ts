import { Observable, Subject } from "rxjs";

/** ゲームループ */
export type GameLoop = {
  type: "GameLoop";
  time: number;
};

/**
 * ゲームループのストリームを生成する
 *
 * @returns ゲームループストリーム
 */
export function gameLoopStream(): Observable<GameLoop> {
  const source = new Subject<GameLoop>();

  const gameLoop = (time: number) => {
    requestAnimationFrame(gameLoop);
    source.next({
      type: "GameLoop",
      time: time,
    });
  };

  requestAnimationFrame(gameLoop);
  return source;
}
