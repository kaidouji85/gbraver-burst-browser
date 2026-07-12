import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { IlluminationModel } from "../model/illumination-model";

/**
 * 照明の強さを変更する
 * １が標準の強さで、0に近づくほど暗くなる
 * @param model モデル
 * @param value 照明の強さ
 * @param duration アニメーション時間
 * @returns アニメーション
 */
export const intensity = (
  model: IlluminationModel,
  value: number,
  duration: number,
): Animate => tween(model, (t) => t.to({ intensity: value }, duration));
