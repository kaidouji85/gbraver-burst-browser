import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningBarrierAnimationProps } from "./animation-props";

/**
 * 帯電
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function electrification(
  props: LightningBarrierAnimationProps,
): Animate {
  const { model } = props;
  return onStart(() => {
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        1500,
      ),
    ),
  );
}
