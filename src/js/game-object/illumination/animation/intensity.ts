import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { IlluminationModel } from "../model/illumination-model";

/**
 * 照明の強さを変更する
 *
 * @param model モデル
 * @param value 照明の強さ
 * @param duration アニメーション時間
 * @returns アニメーション
 */
export function intensity(
  model: IlluminationModel,
  value: number,
  duration: number,
): Animate {
  return tween(model, (t) =>
    t.to(
      {
        intensity: value,
      },
      duration,
    ),
  );
}
