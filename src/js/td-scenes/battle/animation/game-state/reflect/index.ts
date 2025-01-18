import { GameStateX, Reflect } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { StateAnimationProps } from "../state-animation-props";
import { createReflectAnimationParam } from "./create-reflect-animation-param";
import { deathLightning, lightning } from "./lightning";

/**
 * ダメージ反射のアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns アニメーション
 */
export function reflectAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<Reflect>,
): Animate {
  const animationParam = createReflectAnimationParam(props, gameState);
  if (!animationParam) {
    return empty();
  }

  const { effect } = gameState;
  switch (effect.effect) {
    case "Lightning":
      return effect.isDeath
        ? deathLightning(animationParam)
        : lightning(animationParam);
    default:
      return empty();
  }
}
