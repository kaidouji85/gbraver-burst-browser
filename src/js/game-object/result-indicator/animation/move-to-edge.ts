import { Easing } from "@tweenjs/tween.js";

import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { ResultIndicatorModel } from "../model/result-indicator-model";
import { onStart } from "../../../animation/on-start";

/**
 * 画面端に移動する
 *
 * @param model モデル
 * @returns アニメーション
 */
export function moveToEdge(model: ResultIndicatorModel): Animate {
  const duration = 500;
  return onStart(() => {
    model.opacity = 1;
    model.worldCoordinate.x = 0;
    model.worldCoordinate.y = 0;
    model.localCoordinate.x = 0;
    model.localCoordinate.y = 0;
    model.scale = 1.3;
  }).chain(
    all(
      tween(model.worldCoordinate, (t) =>
        t.to({ x: -1, y: 1 }, duration).easing(Easing.Quadratic.InOut),
      ),
      tween(model, (t) =>
        t.to({ scale: 1 }, duration).easing(Easing.Quadratic.InOut),
      ),
    ),
  );
}
