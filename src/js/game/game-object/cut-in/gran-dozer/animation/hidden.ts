import { Animate } from "../../../../../animation/object-animation/animate";
import { tween } from "../../../../../animation/object-animation/tween";
import { GranDozerCutInAnimationProps } from "./animation-props";

/**
 * カットインを非表示にする
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: GranDozerCutInAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ opacity: 0, scale: 1.1 }, 300));
}
