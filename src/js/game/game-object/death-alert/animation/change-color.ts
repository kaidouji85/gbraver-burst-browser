import { Animate } from "../../../../animation/object-animation/animate";
import { tween } from "../../../../animation/object-animation/tween";
import { Color } from "../color";
import { DeathAlertModel } from "../model/death-alert-model";

/**
 * 色を変更する
 * @param model モデル
 * @param color 色
 * @param duration アニメーション時間
 * @returns アニメーション
 */
export const changeColor = (
  model: DeathAlertModel,
  color: Color,
  duration: number,
): Animate => tween(model, (t) => t.to({ color }, duration));
