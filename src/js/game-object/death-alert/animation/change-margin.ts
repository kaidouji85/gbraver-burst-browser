import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { DeathAlertModel } from "../model/death-alert-model";

/**
 * マージンを変更する
 * @param model モデル
 * @param margin マージン
 * @param duration アニメーション時間
 * @returns アニメーション
 */
export const changeMargin = (
  model: DeathAlertModel,
  margin: number,
  duration: number,
): Animate => tween(model, (t) => t.to({ margin }, duration));
