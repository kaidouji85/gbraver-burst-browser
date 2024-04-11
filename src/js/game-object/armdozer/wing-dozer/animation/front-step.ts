import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * フロントステップ
 * @param props アニメーションプロパティ
 * @param distance 移動距離を絶対値で指定
 * @return アニメーション
 */
export function frontStep(
  props: WingDozerAnimationProps,
  distance = 100,
): Animate {
  const { model, sounds } = props;
  return onStart(() => {
    model.animation.type = "FRONT_STEP";
    model.animation.frame = 0;
    sounds.motor.sound.play();
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
        sounds.motor.sound.play();
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
