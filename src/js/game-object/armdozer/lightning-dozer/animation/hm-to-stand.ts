import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";

/**
 * アームハンマー -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function hmToStand(
  model: LightningDozerModel,
  sounds: LightningDozerSounds,
): Animate {
  return all(
    onStart(() => {
      model.animation.type = "HM_TO_STAND";
      model.animation.frame = 0;
      sounds.motor.play();
    })
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
        onStart(() => {
          model.animation.type = "STAND";
          model.animation.frame = 0;
        }),
      ),
    tween(model.position, (t) =>
      t.to(
        {
          x: "+60",
        },
        400,
      ),
    ).chain(
      onStart(() => {
        model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
      }),
    ),
  );
}
