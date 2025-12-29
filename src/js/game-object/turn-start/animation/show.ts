import { Easing } from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { TurnStartModel } from "../model/turn-start-model";

/**
 * 表示アニメーション
 * @param model モデル
 * @returns アニメーション
 */
export function show(model: TurnStartModel): Animate {
  return tween(model, (t) =>
    t.to({ opacity: 1, position: { x: 100 } }, 0),
  ).chain(
    tween(model.position, (t) =>
      t.to({ x: 0 }, 400).easing(Easing.Quadratic.Out),
    ),
  );
}
