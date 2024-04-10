import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";

/**
 * ターンスタート -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function gutsToStand(
  model: LightningDozerModel,
  sounds: LightningDozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "GUTS_TO_STAND";
    model.animation.frame = 0;
    sounds.motor.sound.play();
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
    );
}
