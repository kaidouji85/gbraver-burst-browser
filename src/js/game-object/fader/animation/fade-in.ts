import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { FaderModel } from "../model/fader-model";

/**
 * フェードイン
 * @param model モデル
 * @returns アニメーション
 */
export function fadeIn(model: FaderModel): Animate {
  return tween(model, (t) => t.to({ opacity: 0 }, 500));
}
