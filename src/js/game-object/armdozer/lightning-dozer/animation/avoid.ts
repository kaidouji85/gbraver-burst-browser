import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";

/**
 * 避け
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function avoid(
  model: LightningDozerModel,
  sounds: LightningDozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "BACK_STEP";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  })
    .chain(
      all(
        tween(model.animation, (t) =>
          t.to(
            {
              frame: 1,
            },
            200,
          ),
        ),
        tween(model.position, (t) =>
          t.to(
            {
              x: "+100",
            },
            200,
          ),
        ),
      ),
    )
    .chain(delay(300))
    .chain(
      onStart(() => {
        sounds.motor.sound.play();
      }),
    )
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
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
