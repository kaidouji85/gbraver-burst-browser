import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { PredicatedDamageAnimationProps } from "./animation-props";

/**
 * 表示
 * @param props アニメーションプロパティ
 * @param damage ダメージ
 * @returns アニメーション
 */
export function show(
  props: PredicatedDamageAnimationProps,
  damage: number,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.damage = damage;
    model.shouldPushNotifierStop = true;
  }).chain(tween(model, (t) => t.to({ opacity: 1 }, 200)))
    .chain(onStart(() => {
      model.shouldPushNotifierStop = false;
    }));
}
