import { Animate } from "../../../../animation/object-animation/animate";
import { onStart } from "../../../../animation/object-animation/on-start";
import { tween } from "../../../../animation/object-animation/tween";
import { PredicatedDamageAnimationProps } from "./animation-props";

/**
 * 非表示
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: PredicatedDamageAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.shouldPushNotifierStop = true;
  }).chain(tween(model, (t) => t.to({ opacity: 0 }, 200)));
}
