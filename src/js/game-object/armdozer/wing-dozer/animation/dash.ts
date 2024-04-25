import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/**
 * ダッシュ
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function dash(props: WingDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "DASH_UP";
    model.animation.frame = 0;
    se.play(sounds.motor);
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          300,
        ),
      ),
    )
    .chain(delay(500))
    .chain(
      onStart(() => {
        model.animation.type = "DASH_DOWN";
        model.animation.frame = 0;
        se.play(sounds.motor);
      }),
    )
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          300,
        ),
      ),
    );
}
