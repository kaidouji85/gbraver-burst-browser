import { Easing } from "@tweenjs/tween.js";

import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { ResultIndicatorModel } from "../model/result-indicator-model";

/**
 * 画面左上にスライドイン表示
 * @param model モデル
 * @returns アニメーション
 */
export function slideInToEdge(model: ResultIndicatorModel): Animate {
  const duration = 600;
  const distance = 50;
  return onStart(() => {
    model.opacity = 0;
    model.worldCoordinate.x = -1;
    model.worldCoordinate.y = 1;
    model.localCoordinate.x = -distance;
    model.localCoordinate.y = 0;
    model.scale = 1;
  }).chain(
    all(
      tween(model.localCoordinate, (t) =>
        t.to({ x: 0 }, duration).easing(Easing.Quadratic.InOut),
      ),
      tween(model, (t) =>
        t.to({ opacity: 1 }, duration).easing(Easing.Quadratic.InOut),
      ),
    ),
  );
}
