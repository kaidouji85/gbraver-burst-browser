import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BatterySelectorModel } from "../model";
import { BatterySelectorSounds } from "../sounds/battery-selector-sounds";

/**
 * バッテリー決定アニメーション
 * @param model モデル
 * @param sounds サウンド
 * @return アニメーション
 */
export function decide(
  model: BatterySelectorModel,
  sounds: BatterySelectorSounds,
): Animate {
  return onStart(() => {
    sounds.pushButtonSound.play();
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            batteryButtonScale: 1.1,
          },
          100,
        ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            batteryButtonScale: 1,
          },
          100,
        ),
      ),
    );
}
