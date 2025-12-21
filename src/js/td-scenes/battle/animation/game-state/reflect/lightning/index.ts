import { Animate } from "../../../../../../animation/animate";
import { ReflectAnimationParam } from "../animation-param";
import { deathLightning } from "./death-lightning";
import { normalLightning } from "./normal-lightning";

/**
 * 電撃バリア
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export function lightning(param: ReflectAnimationParam): Animate {
  const { effect } = param;
  return effect.isDeath ? deathLightning(param) : normalLightning(param);
}
