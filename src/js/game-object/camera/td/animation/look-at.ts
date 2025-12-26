import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { Battle3DCameraModel } from "../model/model";
import { Position } from "../position";

/**
 * カメラ視点を移動させる
 *
 * @param model モデル
 * @param duration 移動時間
 * @param position 移動先座標
 * @param easing イージング関数
 * @returns アニメーション
 */
export function lookAt(
  model: Battle3DCameraModel,
  position: Position,
  duration: number,
  easing?: (amount: number) => number,
): Animate {
  return tween(model.target, (t) => t.to(position, duration).easing(easing));
}
