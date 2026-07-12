import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { IlluminationModel } from "../model/illumination-model";

/**
 * 照明の色味を変更する
 * @param model モデル
 * @param value 変更する色味
 * @param duration アニメーション時間
 * @returns アニメーション
 */
export const color = (
  model: IlluminationModel,
  value: { r: number; g: number; b: number },
  duration: number,
): Animate => tween(model, (t) => t.to({ color: value }, duration));
