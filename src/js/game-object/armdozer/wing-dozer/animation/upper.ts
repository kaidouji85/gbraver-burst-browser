import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";

/**
 * アッパー
 *
 * @param model モデル
 * @return アニメーション
 */
export function upper(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = "UPPER_ATTACK";
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({
    frame: 1
  }, 150)));
}