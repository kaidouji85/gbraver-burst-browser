import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import { LeadLineModel } from "../model/lead-line-model";

/**
 * 引き出し線を表示する
 * @param model モデル
 * @return アニメーション
 */
export function show(model: LeadLineModel): Animate {
  return process(() => {
    model.opacity = 1;
  })
  .chain(tween(model, t => t.to({opacity: 1}, 200)));
}