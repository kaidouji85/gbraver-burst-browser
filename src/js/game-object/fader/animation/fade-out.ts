import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { FaderModel } from "../model/fader-model";

/**
 * フェードアウト
 * @param model モデル
 * @param duration アニメーションの時間（ミリ秒）
 * @returns アニメーション
 */
export function fadeOut(model: FaderModel, duration: number): Animate {
  return tween(model, (t) => t.to({ opacity: 1 }, duration));
}
