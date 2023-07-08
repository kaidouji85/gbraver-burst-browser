import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { FaderModel } from "../model/fader-model";

/**
 * 不透明度を変更
 *
 * @param value モデル
 * @param opacity 不透明度
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function opacity(
  value: FaderModel,
  opacity: number,
  duration: number,
): Animate {
  return tween(value, (t) =>
    t.to(
      {
        opacity: opacity,
      },
      duration,
    ),
  );
}
