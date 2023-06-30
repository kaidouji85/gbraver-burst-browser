import * as TWEEN from "@tweenjs/tween.js";

import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { ResultIndicatorModel } from "../model/result-indicator-model";

/**
 * スライドイン表示
 *
 * @param model モデル
 * @return アニメーション
 */
export function slideIn(model: ResultIndicatorModel): Animate {
  const duration = 200;
  const distance = 50;
  return process(() => {
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
            duration
          )
          .easing(TWEEN.Easing.Quadratic.Out)
      ),
      tween(model, (t) =>
        t
          .to(
            {
              opacity: 1,
            },
            duration
          )
          .easing(TWEEN.Easing.Quadratic.Out)
      )
    )
  );
}
