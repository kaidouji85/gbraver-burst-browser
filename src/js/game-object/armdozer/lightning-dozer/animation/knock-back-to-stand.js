// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";

/**
 * ノックバック -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function knockBackToStand(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'KNOCK_BACK';
    model.animation.frame = 1;
  }).chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}