import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * ダッシュ -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function dashToStand(props: WingDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "DASH_TO_STAND";
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
