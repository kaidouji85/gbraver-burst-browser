import { Animate } from "../../../../animation/object-animation/animate";
import { onStart } from "../../../../animation/object-animation/on-start";
import { tween } from "../../../../animation/object-animation/tween";
import { StatusIconAnimationProps } from "./animation-props";

/**
 * ボタンを開く
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function open(props: StatusIconAnimationProps): Animate {
  const { model } = props;
  return onStart(() => {
    model.opacity = 0;
  }).chain(tween(model, (t) => t.to({ opacity: 1 }, 200)));
}
