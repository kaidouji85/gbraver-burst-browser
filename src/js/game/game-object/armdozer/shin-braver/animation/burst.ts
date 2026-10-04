import { Animate } from "../../../../../animation/object-animation/animate";
import { delay } from "../../../../../animation/object-animation/delay";
import { tween } from "../../../../../animation/object-animation/tween";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * バースト
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function burst(props: ShinBraverAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "BURST_UP";
      se.play(sounds.motor);
    }),
  )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 200)))
    .chain(delay(500))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "BURST_DOWN";
          se.play(sounds.motor);
        }),
      ),
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 200)));
}
