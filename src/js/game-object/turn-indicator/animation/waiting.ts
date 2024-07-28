import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { TurnIndicatorModel } from "../model/turn-indicator-model";

/**
 * 待ちアニメ
 *
 * @param model モデル
 * @returns アニメーション
 */
export function waiting(model: TurnIndicatorModel): Animate {
  return onStart(() => {
    model.animation = 0;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            animation: 1,
          },
          500,
        ),
      ),
    )
    .chain(delay(150));
}
