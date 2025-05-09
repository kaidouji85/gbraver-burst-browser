import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { EffectClearAnimationProps } from "./animation-props";

/**
 * 表示
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function show(props: EffectClearAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ opacity: 0, scale: 1.2 }, 0)).chain(
    tween(model, (t) => t.to({ opacity: 1, scale: 1 }, 400)),
  );
}
