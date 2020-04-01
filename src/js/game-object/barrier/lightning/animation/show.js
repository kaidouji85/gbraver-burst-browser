// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningBarrierModel} from "../model/lightning-barrier-model";
import {tween} from "../../../../animation/tween";

/**
 * バリアを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: LightningBarrierModel): Animate {
  return tween(model, t => t.to({opacity: 1}, 500));
}