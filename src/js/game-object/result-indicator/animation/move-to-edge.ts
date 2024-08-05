import { Easing } from "@tweenjs/tween.js";

import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { ResultIndicatorModel } from "../model/result-indicator-model";

/**
 * 画面端に移動する
 *
 * @param model モデル
 * @returns アニメーション
 */
export function moveToEdge(model: ResultIndicatorModel): Animate {
  const duration = 300;
  return all(
    tween(model.worldCoordinate, (t) =>
      t
        .to(
          {
            x: -1,
            y: 1,
          },
          duration,
        )
        .easing(Easing.Quadratic.InOut),
    ),
    tween(model, (t) =>
      t
        .to(
          {
            scale: 1,
          },
          duration,
        )
        .easing(Easing.Quadratic.InOut),
    ),
  );
}
