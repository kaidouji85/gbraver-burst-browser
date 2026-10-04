import { Animate } from "../../../../../animation/object-animation/animate";
import { delay } from "../../../../../animation/object-animation/delay";
import { tween } from "../../../../../animation/object-animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * ダッシュ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function dash(props: WingDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "DASH_UP";
      se.play(sounds.motor);
    }),
  )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)))
    .chain(delay(500))
    .chain(
      tween(model.animation, (t) =>
        t.to({ frame: 0 }, 0).onStart(() => {
          model.animation.type = "DASH_DOWN";
          se.play(sounds.motor);
        }),
      ),
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 1 }, 300)));
}
