import { all } from "../../../../animation/object-animation/all";
import { Animate } from "../../../../animation/object-animation/animate";
import { onStart } from "../../../../animation/object-animation/on-start";
import { tween } from "../../../../animation/object-animation/tween";
import { ResultIndicatorModel } from "../model/result-indicator-model";

/**
 * 画面左上にスライドイン表示
 * @param model モデル
 * @returns アニメーション
 */
export function slideInToEdge(model: ResultIndicatorModel): Animate {
  const duration = 300;
  return onStart(() => {
    model.opacity = 0;
    model.worldCoordinate.x = -1;
    model.worldCoordinate.y = 1;
    model.localCoordinate.x = 0;
    model.localCoordinate.y = 22.5;
    model.scale = 1.3;
  }).chain(
    all(
      tween(model.localCoordinate, (t) => t.to({ y: 0 }, duration)),
      tween(model, (t) => t.to({ opacity: 1, scale: 1 }, duration)),
    ),
  );
}
