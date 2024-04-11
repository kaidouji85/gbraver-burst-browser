import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * 気をつけ
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function upright(
  props: NeoLandozerAnimationProps
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "UPRIGHT";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        200,
      ),
    ),
  );
}
