import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import type { Battle3DCameraModel } from "../model/model";
import type { Position } from "../position";

/**
 * カメラを移動する
 *
 * @param model モデル
 * @param position 移動先座標
 * @param duration 移動時間
 * @returns アニメーション
 */
export function move(
  model: Battle3DCameraModel,
  position: Position,
  duration: number,
): Animate {
  return tween(model.position, (t) => t.to(position, duration));
}
