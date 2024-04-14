import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { GenesisBraverAnimationProps } from "./animation-props";

/**
 * バースト
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function burst(props: GenesisBraverAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "BURST_UP";
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
    .chain(delay(500))
    .chain(
      onStart(() => {
        model.animation.type = "BURST_DOWN";
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
