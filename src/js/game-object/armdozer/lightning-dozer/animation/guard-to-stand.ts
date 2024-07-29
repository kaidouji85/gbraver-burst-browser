import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * ガード -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function guardToStand(props: LightningDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "GUARD";
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
