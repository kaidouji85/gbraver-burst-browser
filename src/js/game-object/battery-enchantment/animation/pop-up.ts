import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BatteryEnchantmentModel } from "../model/battery-enchantment-model";
import { BatteryEnchantmentSounds } from "../sounds/battery-enchantment-sounds";

/**
 * ポップアップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function popUp(
  model: BatteryEnchantmentModel,
  sounds: BatteryEnchantmentSounds,
): Animate {
  return onStart(() => {
    model.opacity = 0;
    model.scale = 1.2;
    sounds.benefitEffect.play();
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
            scale: 1,
          },
          400,
        ),
      ),
    )
    .chain(delay(600))
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 0,
            scale: 1.1,
          },
          200,
        ),
      ),
    );
}
