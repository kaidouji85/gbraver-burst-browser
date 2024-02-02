import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/**
 * ダッシュ -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function dashToStand(
  model: WingDozerModel,
  sounds: WingDozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "DASH_TO_STAND";
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
    );
}
