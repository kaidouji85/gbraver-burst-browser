import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { TurnStartModel } from "../model/turn-start-model";

/**
 * 非表示アニメーション
 *
 * @param model モデル
 * @returns アニメーション
 */
export function hidden(model: TurnStartModel): Animate {
  return tween(model, (t) =>
    t.to(
      {
        opacity: 0,
      },
      200,
    ),
  );
}
