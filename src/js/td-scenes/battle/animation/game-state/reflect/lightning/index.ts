import { Animate } from "../../../../../../animation/animate";
import { ReflectAnimationParam } from "../animation-param";
import { deathLightning } from "./death-lightning";
import { drawLightning } from "./draw-lightning";
import { normalLightning } from "./normal-lightning";

/**
 * 電撃バリア
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export function lightning(param: ReflectAnimationParam): Animate {
  let animation = normalLightning(param);
  const { effect, reflecting } = param;
  if (effect.isDeath && reflecting.state.armdozer.hp <= 0) {
    animation = drawLightning(param);
  } else if (effect.isDeath) {
    animation = deathLightning(param);
  }
  return animation;
}
