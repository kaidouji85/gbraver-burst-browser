import type { Battle, GameStateX } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import type { StateAnimationProps } from "../state-animation-props";
import { toBattleAnimationParam } from "./animation-param";
import { attackAnimation } from "./attack";

/**
 * 戦闘アニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns アニメーション
 */
export function battleAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<Battle>,
): Animate {
  const param = toBattleAnimationParam(props, gameState);

  if (!param) {
    return empty();
  }

  return attackAnimation(param);
}
