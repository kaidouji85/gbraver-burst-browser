import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * アッパー -> 立ち
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function upperToStand(
  props: WingDozerAnimationProps
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "UPPER_TO_STAND";
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
        model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
      }),
    );
}
