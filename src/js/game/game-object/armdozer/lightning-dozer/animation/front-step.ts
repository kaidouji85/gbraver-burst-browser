import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { delay } from "../../../../../animation/object-animation/delay";
import { onStart } from "../../../../../animation/object-animation/on-start";
import { tween } from "../../../../../animation/object-animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * フロントステップ
 * @param props アニメーションプロパティ
 * @param distance 移動距離を絶対値で指定する
 * @returns アニメーション
 */
export function frontStep(
  props: LightningDozerAnimationProps,
  distance = 100,
): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "FRONT_STEP";
      se.play(sounds.motor);
    }),
  )
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
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "STAND";
        }),
      ),
    );
}
