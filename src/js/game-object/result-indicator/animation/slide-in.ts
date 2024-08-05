import { Easing } from "@tweenjs/tween.js";

import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { ResultIndicatorModel } from "../model/result-indicator-model";

/**
 * スライドイン表示
 *
 * @param model モデル
 * @returns アニメーション
 */
export function slideIn(model: ResultIndicatorModel): Animate {
  const duration = 100;
  const distance = 50;
  return onStart(() => {
    model.opacity = 0;
    model.worldCoordinate.x = 0;
    model.worldCoordinate.y = 0;
    model.localCoordinate.x = -distance;
    model.localCoordinate.y = 0;
    model.scale = 1.3;
  }).chain(
    all(
      tween(model.localCoordinate, (t) =>
        t
          .to(
            {
              x: `+${distance}`,
            },
            duration,
          )
          .easing(Easing.Quadratic.Out),
      ),
      tween(model, (t) =>
        t
          .to(
            {
              opacity: 1,
            },
            duration,
          )
          .easing(Easing.Quadratic.Out),
      ),
    ),
  );
}
