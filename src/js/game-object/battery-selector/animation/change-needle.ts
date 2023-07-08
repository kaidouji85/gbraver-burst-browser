import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { BatterySelectorModel } from "../model";
const MAX_DURATION = 500;

/**
 * メーター針を変化させる
 *
 * @param model モデル
 * @param group Tweenグループ
 * @param needle メーター針の値
 * @return アニメーション
 */
export function changeNeedle(
  model: BatterySelectorModel,
  group: TWEEN.Group,
  needle: number,
): Animate {
  const duration = Math.abs(model.needle - needle) * MAX_DURATION;
  return tween(
    model,
    (t) =>
      t.to(
        {
          needle: needle,
        },
        duration,
      ),
    group,
  );
}
