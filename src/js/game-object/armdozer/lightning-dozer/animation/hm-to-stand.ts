import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import { LightningDozerAnimationProps } from "./animation-props";

/**
 * アームハンマー -> 立ち
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function hmToStand(props: LightningDozerAnimationProps): Animate {
  const { model, sounds, se } = props;
  return all(
    tween(model.animation, (t) =>
      t.to({ frame: 0 }, 0).onStart(() => {
        model.animation.type = "HM_TO_STAND";
        se.play(sounds.motor);
      }),
    )
      .chain(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            400,
          ),
        ),
      )
      .chain(
        tween(model.animation, (t) =>
          t.to({ frame: 0 }, 0).onStart(() => {
            model.animation.type = "STAND";
          }),
        ),
      ),
    tween(model.position, (t) =>
      t.to(
        {
          x: "+60",
        },
        400,
      ),
    ).chain(
      tween(model.position, (t) => t.to({ z: ARMDOZER_SPRITE_STANDARD_Z }, 0)),
    ),
  );
}
