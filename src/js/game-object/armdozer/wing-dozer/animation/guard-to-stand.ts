import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/**
 * ガード -> 立ち
 *
 *  @param model モデル
 *  @param sounds 音
 *  @return アニメーション
 */
export function guardToStand(
  model: WingDozerModel,
  sounds: WingDozerSounds,
): Animate {
  return onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "GUARD";
    sounds.motor.play();
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
