import { Animate } from "../../../../animation/object-animation/animate";
import { tween } from "../../../../animation/object-animation/tween";
import { StatusIconAnimationProps } from "./animation-props";

/**
 * ボタンを閉じる
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function close(props: StatusIconAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) => t.to({ opacity: 0 }, 200));
}
