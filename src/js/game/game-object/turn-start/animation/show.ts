import { all } from "../../../../animation/object-animation/all";
import { Animate } from "../../../../animation/object-animation/animate";
import { tween } from "../../../../animation/object-animation/tween";
import { TurnStartModel } from "../model/turn-start-model";

/**
 * 表示アニメーション
 * @param model モデル
 * @returns アニメーション
 */
export function show(model: TurnStartModel): Animate {
  return tween(model, (t) =>
    t.to({ opacity: 0, position: { x: 180 } }, 0),
  ).chain(
    all(
      tween(model, (t) => t.to({ opacity: 1 }, 200)),
      tween(model, (t) => t.to({ position: { x: 0 } }, 400)),
    ),
  );
}
