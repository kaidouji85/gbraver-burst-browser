import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * ノックバック -> 立ち
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function knockBackToStand(props: NeoLandozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "KNOCK_BACK";
    se.play(sounds.motor);
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          300,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.frame = 0;
        model.animation.type = "STAND";
      }),
    );
}
