import { Animate } from "../../../../animation/object-animation/animate";
import { tween } from "../../../../animation/object-animation/tween";
import type { FaderModel } from "../model/fader-model";

/**
 * フェードイン
 * @param model モデル
 * @param duration アニメーションの時間（ミリ秒）
 * @returns アニメーション
 */
export function fadeIn(model: FaderModel, duration: number): Animate {
  return tween(model, (t) => t.to({ opacity: 0 }, duration));
}
