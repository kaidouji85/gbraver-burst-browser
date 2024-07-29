import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * ターンスタート -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function gutsToStand(props: LightningDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "GUTS_TO_STAND";
      se.play(sounds.motor);
    }),
  )
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
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "STAND";
        }),
      ),
    );
}
