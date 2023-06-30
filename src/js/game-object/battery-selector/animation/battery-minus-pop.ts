import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { BatterySelectorModel } from "../model";
import type { BatterySelectorSounds } from "../sounds/battery-selector-sounds";

/**
 * マイナスボタン ポップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @param group Tweenグループ
 * @return アニメーション
 */
export function batteryMinusPop(
  model: BatterySelectorModel,
  sounds: BatterySelectorSounds,
  group: TWEEN.Group
): Animate {
  return process(() => {
    sounds.batteryChangeSound.play();
  })
    .chain(
      tween(
        model,
        (t) =>
          t.to(
            {
              minusButtonScale: 1.1,
            },
            100
          ),
        group
      )
    )
    .chain(
      tween(
        model,
        (t) =>
          t.to(
            {
              minusButtonScale: 1,
            },
            100
          ),
        group
      )
    );
}
