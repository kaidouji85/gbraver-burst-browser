import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { DeathAlertModel } from "../model/death-alert-model";

/**
 * 不透明度を変更する
 * @param model モデル
 * @param opacity 不透明度
 * @param duration アニメーション時間
 * @returns アニメーション
 */
export const opacity = (
  model: DeathAlertModel,
  opacity: number,
  duration: number,
): Animate => tween(model, (t) => t.to({ opacity: opacity }, duration));
