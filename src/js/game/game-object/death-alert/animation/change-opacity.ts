import { Animate } from "../../../../animation/object-animation/animate";
import { tween } from "../../../../animation/object-animation/tween";
import { DeathAlertModel } from "../model/death-alert-model";

/**
 * 不透明度を変更する
 * @param model モデル
 * @param opacity 不透明度
 * @param duration アニメーション時間
 * @returns アニメーション
 */
export const changeOpacity = (
  model: DeathAlertModel,
  opacity: number,
  duration: number,
): Animate => tween(model, (t) => t.to({ opacity }, duration));
