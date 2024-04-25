import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { TurnIndicatorModel } from "../model/turn-indicator-model";

/**
 * 待ちアニメ
 *
 * @param model モデル
 * @param group Tweenグループ
 * @returns アニメーション
 */
export function waiting(
  model: TurnIndicatorModel,
  group: TWEEN.Group,
): Animate {
  return onStart(() => {
    model.animation = 0;
  }, group)
    .chain(
      tween(
        model,
        (t) =>
          t.to(
            {
              animation: 1,
            },
            500,
          ),
        group,
      ),
    )
    .chain(delay(150, group));
}
