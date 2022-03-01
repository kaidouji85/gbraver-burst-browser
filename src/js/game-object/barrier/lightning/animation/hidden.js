// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningBarrierModel} from "../model/lightning-barrier-model";
import {tween} from "../../../../animation/tween";

/**
 * バリアを消す
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: LightningBarrierModel): Animate {
  return tween(model, t => t.to({opacity: 0}, 1000))
}