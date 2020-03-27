// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";

/**
 * チャージ
 *
 * @param model モデル
 * @return アニメーション
 */
export function charge(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'HM_CHARGE';
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}