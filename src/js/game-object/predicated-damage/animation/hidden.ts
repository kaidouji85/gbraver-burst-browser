import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { PredicatedDamageAnimationProps } from "./animation-props";

/**
 * 非表示
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: PredicatedDamageAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ opacity: 0 }, 200));
}
