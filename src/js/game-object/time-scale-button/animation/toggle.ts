import * as TWEEN from "@tweenjs/tween.js";

import type { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { TimeScaleButtonModel } from "../model/time-scale-button-model";
import type { TimeScaleButtonSounds } from "../sounds/time-scale-sounds";

/**
 * タイムスケールの値を入れ替える
 *
 * @param model モデル
 * @param sounds サウンド
 * @param group TWEENグループ
 * @param timeScale タイムスケール
 * @return アニメーション
 */
export function toggle(
  model: TimeScaleButtonModel,
  sounds: TimeScaleButtonSounds,
  group: TWEEN.Group,
  timeScale: number,
): Animate {
  return onStart(() => {
    model.timeScale = timeScale;
    model.scale = 1;
    sounds.changeValue.play();
  }, group)
    .chain(
      tween(
        model,
        (t) =>
          t.to(
            {
              scale: 1.1,
            },
            100,
          ),
        group,
      ),
    )
    .chain(
      tween(
        model,
        (t) =>
          t.to(
            {
              scale: 1,
            },
            100,
          ),
        group,
      ),
    );
}
