import { Animate } from "../../../../../animation/object-animation/animate";
import { delay } from "../../../../../animation/object-animation/delay";
import { onStart } from "../../../../../animation/object-animation/on-start";
import { tween } from "../../../../../animation/object-animation/tween";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * ターンスタート -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function gutsToStand(props: NeoLandozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 1 }, 0).onStart(() => {
      model.animation.type = "GUTS_DOWN";
      se.play(sounds.motor);
    }),
  )
    .chain(tween(model.animation, (t) => t.to({ frame: 0 }, 200)))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 1 }, 0).onStart(() => {
          model.animation.type = "GUTS_UP";
        }),
      ),
    )
    .chain(delay(500))
    .chain(
      onStart(() => {
        se.play(sounds.motor);
      }),
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 0 }, 200)))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "STAND";
        }),
      ),
    );
}
