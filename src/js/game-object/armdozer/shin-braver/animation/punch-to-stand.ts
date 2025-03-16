import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../../td-position";
import { ShinBraverAnimationProps } from "./animation-props";

/**
 * ストレートパンチ -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function punchToStand(props: ShinBraverAnimationProps): Animate {
  const { model, sounds, se } = props;
  return tween(model.animation, (t) =>
    t.to({ frame: 0 }, 0).onStart(() => {
      model.animation.type = "SP_TO_STAND";
      se.play(sounds.motor);
    }),
  )
    .chain(
      tween(model.animation, (t) => t.to({ frame: 1 }, 400)),
      tween(model.position, (t) => t.to({ x: "+80" }, 400)),
    )
    .chain(
      tween(model, (t) =>
        t
          .to(
            {
              animation: { frame: 0 },
              position: { z: ARMDOZER_SPRITE_STANDARD_Z },
            },
            0,
          )
          .onStart(() => {
            model.animation.type = "STAND";
          }),
      ),
    );
}
