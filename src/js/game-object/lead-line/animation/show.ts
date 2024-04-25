import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import { LeadLineModel } from "../model/lead-line-model";

/**
 * 引き出し線を表示する
 * @param model モデル
 * @returns アニメーション
 */
export function show(model: LeadLineModel): Animate {
  return onStart(() => {
    model.opacity = 0;
  }).chain(tween(model, (t) => t.to({ opacity: 1 }, 200)));
}
