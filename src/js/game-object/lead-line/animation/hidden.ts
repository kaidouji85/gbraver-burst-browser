import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { LeadLineModel } from "../model/lead-line-model";

/**
 * 引き出し線を消す
 * @param model モデル
 * @returns アニメーション
 */
export function hidden(model: LeadLineModel): Animate {
  return onStart(() => {
    model.opacity = 1;
  }).chain(tween(model, (t) => t.to({ opacity: 0 }, 200)));
}
