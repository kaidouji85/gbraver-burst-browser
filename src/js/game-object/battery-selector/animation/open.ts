import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { BatterySelectorModel } from "../model";

/**
 * ボタン表示アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function open(model: BatterySelectorModel): Animate {
  return process(() => {
    model.disabled = true;
    model.opacity = 0;
  }).chain(tween(model, t => t.to({
    opacity: 1
  }, 200))).chain(process(() => {
    model.disabled = false;
  }));
}