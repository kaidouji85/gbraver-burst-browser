import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { Battle3DCameraModel } from "../model/model";
import { Position } from "../position";

/**
 * カメラを移動する
 *
 * @param model モデル
 * @param position 移動先座標
 * @param duration 移動時間
 * @param easing イージング関数
 * @returns アニメーション
 */
export function move(
  model: Battle3DCameraModel,
  position: Position,
  duration: number,
  easing?: (amount: number) => number,
): Animate {
  return tween(model.position, (t) => t.to(position, duration).easing(easing));
}
