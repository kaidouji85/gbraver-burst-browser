import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * ターンスタート -> 立ち
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function gutsToStand(props: NeoLandozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "GUTS_DOWN";
    model.animation.frame = 1;
    se.play(sounds.motor);
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "GUTS_UP";
        model.animation.frame = 1;
      }),
    )
    .chain(delay(500))
    .chain(
      onStart(() => {
        se.play(sounds.motor);
      }),
    )
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          200,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
