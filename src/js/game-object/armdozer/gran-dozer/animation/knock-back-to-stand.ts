import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";
import { onStart } from "../../../../animation/on-start";
import { delay } from "../../../../animation/delay";

/**
 * ノックバック -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function knockBackToStand(props: GranDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "KNOCK_BACK";
      se.play(sounds.motor);
    }),
  )
    .chain(tween(model.animation, (t) => t.to({ frame: 0 }, 300)))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "STAND";
        }),
      ),
    )
    .chain(
      tween(model.animation, (t) =>
        t
          .onStart(() => {
            model.animation.type = "FRONT_STEP";
          })
          .to({ frame: 0 }, 0),
      ),
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)))
    .chain(
      tween(model.animation, (t) =>
        t
          .onStart(() => {
            se.play(sounds.motor);
          })
          .to({ frame: 0 }, 300),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
      }),
    );
}
