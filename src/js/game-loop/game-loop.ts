import type { Stream } from "../stream/stream";
import { createStreamSource } from "../stream/stream";

/** ゲームループ */
export type GameLoop = {
  type: "GameLoop";
  time: number;
};

/**
 * ゲームループのストリームを生成する
 *
 * @return ゲームループストリーム
 */
export function gameLoopStream(): Stream<GameLoop> {
  const source = createStreamSource<GameLoop>();

  const gameLoop = (time: number) => {
    requestAnimationFrame(gameLoop);
    source.next({
      type: "GameLoop",
      time: time
    });
  };

  requestAnimationFrame(gameLoop);
  return source;
}