import type { GameEnd, GameStateX } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import type { StateAnimationProps } from "../state-animation-props";
import { evenMatchAnimation } from "./even-match/even-match";
import { gameOverAnimation } from "./game-over/game-over";
import { toGameOverParam } from "./game-over/game-over-param";

/**
 * ゲーム終了アニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @returns アニメーション
 */
export function gameEndAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<GameEnd>,
): Animate {
  if (gameState.effect.result.type === "EvenMatch") {
    return evenMatchAnimation(props);
  }

  const gameOverParam =
    gameState.effect.result.type === "GameOver"
      ? toGameOverParam(props, gameState.effect.result)
      : null;

  if (gameOverParam) {
    return gameOverAnimation(gameOverParam);
  }

  return empty();
}
