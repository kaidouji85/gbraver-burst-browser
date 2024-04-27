import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { Battle3DCameraModel } from "../model/model";
import type { Position } from "../position";

/**
 * カメラ視点を移動させる
 *
 * @param model モデル
 * @param duration 移動時間
 * @param position 移動先座標
 * @returns アニメーション
 */
export function lookAt(
  model: Battle3DCameraModel,
  position: Position,
  duration: number,
): Animate {
  return tween(model.target, (t) => t.to(position, duration));
}
