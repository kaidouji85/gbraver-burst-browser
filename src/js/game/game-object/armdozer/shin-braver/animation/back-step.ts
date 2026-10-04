import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { delay } from "../../../../../animation/object-animation/delay";
import { onStart } from "../../../../../animation/object-animation/on-start";
import { tween } from "../../../../../animation/object-animation/tween";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * バックステップ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function backStep(props: ShinBraverAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "BACK_STEP";
      se.play(sounds.motor);
    }),
  )
    .chain(
      all(
        tween(model.animation, (t) => t.to({ frame: 1 }, 200)),
        tween(model.position, (t) => t.to({ x: "+100" }, 200)),
      ),
    )
    .chain(delay(300))
    .chain(
      onStart(() => {
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
    );
}
