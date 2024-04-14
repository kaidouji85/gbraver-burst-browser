import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * 避け -> 立ち
 * @param props アニメーションプロパティ
 * @param distance 移動距離を絶対値で指定する
 * @return アニメーション
 */
export function frontStep(
  props: ShinBraverAnimationProps,
  distance = 100,
): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "FRONT_STEP";
    model.animation.frame = 0;
    se.play(sounds.motor);
  })
    .chain(
      all(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            300,
          ),
        ),
        tween(model.position, (t) =>
          t.to(
            {
              x: `-${Math.abs(distance)}`,
            },
            300,
          ),
        ),
      ),
    )
    .chain(delay(300))
    .chain(
      onStart(() => {
        se.play(sounds.motor);
      }),
    )
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
