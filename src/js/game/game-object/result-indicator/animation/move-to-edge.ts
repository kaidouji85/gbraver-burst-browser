import { Easing } from "@tweenjs/tween.js";

import { all } from "../../../../animation/object-animation/all";
import { Animate } from "../../../../animation/object-animation/animate";
import { tween } from "../../../../animation/object-animation/tween";
import { ResultIndicatorModel } from "../model/result-indicator-model";

/**
 * 画面端に移動する
 * @param model モデル
 * @returns アニメーション
 */
export function moveToEdge(model: ResultIndicatorModel): Animate {
  const duration = 500;
  return all(
    tween(model.worldCoordinate, (t) =>
      t.to({ x: -1, y: 1 }, duration).easing(Easing.Quadratic.InOut),
    ),
    tween(model, (t) =>
      t.to({ scale: 1 }, duration).easing(Easing.Quadratic.InOut),
    ),
  );
}
