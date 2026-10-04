import { Animate } from "../../../../../animation/object-animation/animate";
import { tween } from "../../../../../animation/object-animation/tween";
import { LightningBarrierAnimationProps } from "./animation-props";

/**
 * バリアを消す
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hidden(props: LightningBarrierAnimationProps): Animate {
  const { model } = props;
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
      },
      1000,
    ),
  );
}
