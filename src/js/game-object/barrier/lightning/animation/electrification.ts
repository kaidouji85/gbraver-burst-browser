import TWEEN, {Group} from "@tweenjs/tween.js";

import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { LightningBarrierModel } from "../model/lightning-barrier-model";

/**
 * 帯電
 *
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function electrification(model: LightningBarrierModel, group: Group): Animate {
  return process(() => {
    model.animation.frame = 0;
  }, group).chain(tween(model.animation, t => t.to({
    frame: 1
  }, 1500), group));
}