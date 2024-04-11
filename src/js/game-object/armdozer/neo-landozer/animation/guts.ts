import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * ガッツ
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function guts(
  props: NeoLandozerAnimationProps
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "GUTS_UP";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          200,
        ),
      ),
    )
    .chain(delay(500))
    .chain(
      onStart(() => {
        model.animation.type = "GUTS_DOWN";
        model.animation.frame = 0;
        sounds.motor.sound.play();
      }),
    )
    .chain(
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
