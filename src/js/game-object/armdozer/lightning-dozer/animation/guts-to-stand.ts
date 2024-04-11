import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * ターンスタート -> 立ち
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function gutsToStand(
  props: LightningDozerAnimationProps
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "GUTS_TO_STAND";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          400,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
