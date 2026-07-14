import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { FaderModel } from "../model/fader-model";

/**
 * フェードアウト
 * @param model モデル
 * @returns アニメーション
 */
export function fadeOut(model: FaderModel): Animate {
  return tween(model, (t) => t.to({ opacity: 1 }, 500));
}
