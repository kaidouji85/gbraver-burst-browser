import { map, Observable, Subject } from "rxjs";

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

  return source.pipe(map((time) => ({ type: "GameLoop", time })));
}
