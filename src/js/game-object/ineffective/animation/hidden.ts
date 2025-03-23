import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { IneffectiveAnimationProps } from "./animation-props";

/**
 * 非表示
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: IneffectiveAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ opacity: 0, scale: 1.1 }, 200));
}
