import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * ガッツ
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function guts(props: LightningDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "GUTS_UP";
    model.animation.frame = 0;
    se.play(sounds.motor);
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
    .chain(delay(600))
    .chain(
      onStart(() => {
        model.animation.type = "GUTS_DOWN";
        model.animation.frame = 0;
        se.play(sounds.motor);
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
