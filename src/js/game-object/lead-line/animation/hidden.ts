import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import { LeadLineModel } from "../model/lead-line-model";

/**
 * 引き出し線を消す
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: LeadLineModel): Animate {
  return process(() => {
    model.opacity = 1;
  })
  .chain(tween(model, t => t.to({opacity: 0}, 200)));
}