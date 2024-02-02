import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BatterySelectorModel } from "../model";
import type { BatterySelectorSounds } from "../sounds/battery-selector-sounds";

/**
 * プラスボタン ポップ 無音
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function silentlyBatteryPlusPop(
  model: BatterySelectorModel,
  group: TWEEN.Group,
): Animate {
  return tween(
    model,
    (t) =>
      t.to(
        {
          plusButtonScale: 1.1,
        },
        100,
      ),
    group,
  ).chain(
    tween(
      model,
      (t) =>
        t.to(
          {
            plusButtonScale: 1,
          },
          100,
        ),
      group,
    ),
  );
}

/**
 * プラスボタン ポップ
 * @param model モデル
 * @param sounds 効果音
 * @param group Tweenグループ
 * @return アニメーション
 */
export function batteryPlusPop(
  model: BatterySelectorModel,
  sounds: BatterySelectorSounds,
  group: TWEEN.Group,
): Animate {
  return onStart(() => {
    sounds.batteryChangeSound.play();
  }).chain(silentlyBatteryPlusPop(model, group));
}
