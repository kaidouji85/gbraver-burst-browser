// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

/**
 * ターンスタート -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function turnStartToStand(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS_DOWN';
    model.animation.frame = 1;
  }).chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'GUTS_UP';
      model.animation.frame = 1;
    }))
    .chain(delay(200))
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}