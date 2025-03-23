import { GameEnd, GameStateX } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { StateAnimationProps } from "../state-animation-props";
import { gameOverAnimation } from "./game-over";

/**
 * ゲーム終了アニメーション
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @returns アニメーション
 */
export function gameEndAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<GameEnd>,
): Animate {
  const { result } = gameState.effect;
  switch (result.type) {
    case "GameOver":
      return gameOverAnimation(props, {
        ...gameState,
        effect: { ...gameState.effect, result },
      });
    default:
      return empty();
  }
}
