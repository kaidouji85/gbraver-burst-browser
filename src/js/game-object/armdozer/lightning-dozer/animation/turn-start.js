// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

/**
 * ターンスタート
 *
 * @param model モデル
 * @return アニメーション
 */
export function turnStart(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS_UP';
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({frame: 1}, 300)))
    .chain(delay(100))
    .chain(process(() => {
      model.animation.type = 'GUTS_DOWN';
      model.animation.frame = 0;
    }))
    .chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}