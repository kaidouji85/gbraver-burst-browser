import { Animate } from "../../../animation/animate";
import { delay } from "../../../animation/delay";
import { tween } from "../../../animation/tween";
import type { TurnIndicatorModel } from "../model/turn-indicator-model";

/**
 * 待ちアニメ
 *
 * @param model モデル
 * @returns アニメーション
 */
export function waiting(model: TurnIndicatorModel): Animate {
  return tween(model, (t) => t.to({ animation: 0 }, 0))
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
