import { Animate } from "../../../../../animation/object-animation/animate";
import { delay } from "../../../../../animation/object-animation/delay";
import { tween } from "../../../../../animation/object-animation/tween";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * ガッツ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function guts(props: LightningDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "GUTS_UP";
      se.play(sounds.motor);
    }),
  )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 200)))
    .chain(delay(600))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "GUTS_DOWN";
          se.play(sounds.motor);
        }),
      ),
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 200)));
}
