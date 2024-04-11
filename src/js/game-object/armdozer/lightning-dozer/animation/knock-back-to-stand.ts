import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * ノックバック -> 立ち
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function knockBackToStand(props: LightningDozerAnimationProps): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "KNOCK_BACK";
    model.animation.frame = 1;
    sounds.motor.sound.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          300,
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
