import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";
import {ARMDOZER_SPRITE_STANDARD_Z} from "../../position";

/**
 * アッパー -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function upperToStand(
  model: WingDozerModel,
  sounds: WingDozerSounds,
): Animate {
  return process(() => {
    model.animation.type = "UPPER_TO_STAND";
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
      process(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
        model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
      }),
    );
}
