import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { TurnIndicatorModel } from "../model/turn-indicator-model";

/**
 * ターンインジケータを非表示にする
 *
 * @param model モデル
 * @returns アニメーション
 */
export function invisible(model: TurnIndicatorModel): Animate {
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
      },
      500,
    ),
  );
}
