import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { ARMDOZER_SPRITE_STANDARD_Z } from "../../position";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";

/**
 * チャージ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function charge(
  model: LightningDozerModel,
  sounds: LightningDozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "HM_CHARGE";
    model.animation.frame = 0;
    model.position.z = ARMDOZER_SPRITE_STANDARD_Z;
    sounds.motor.play();
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        300,
      ),
    ),
  );
}
