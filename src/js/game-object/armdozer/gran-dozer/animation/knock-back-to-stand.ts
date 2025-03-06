import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

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
    .chain(tween(model.animation, (t) => t.to({ frame: 0 }, 200)))
    .chain(
      tween(model.animation, (t) =>
        t
          .onStart(() => {
            model.animation.type = "STAND";
          })
          .to({ frame: 0 }, 0),
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
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 200)))
    .chain(delay(100))
    .chain(
      tween(model.animation, (t) =>
        t
          .onStart(() => {
            se.play(sounds.motor);
          })
          .to({ frame: 0 }, 200)
          .onComplete(() => {
            model.animation.type = "STAND";
          }),
      ),
    );
}
