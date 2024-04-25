import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import { NeoLandozerAnimationProps } from "./animation-props";

/**
 * アームハンマー -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hmToStand(props: NeoLandozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return onStart(() => {
    model.animation.type = "HM_TO_STAND";
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
      tween(model.position, (t) =>
        t.to(
          {
            x: "+100",
          },
          300,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
        model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
      }),
    );
}
