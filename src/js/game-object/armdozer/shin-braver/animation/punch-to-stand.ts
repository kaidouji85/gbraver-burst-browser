import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * ストレートパンチ -> 立ち
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function punchToStand(props: ShinBraverAnimationProps): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "SP_TO_STAND";
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
      tween(model.position, (t) =>
        t.to(
          {
            x: "+80",
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
