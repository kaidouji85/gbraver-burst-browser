// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";

/**
 * タックル -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function tackleToStand(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'TACKLE';
    model.animation.frame = 1;
  }).chain(all(
    tween(model.animation, t => t.to({frame: 0}, 600)),
    tween(model.position, t => t.to({x: '+80'}, 600))
  )).chain(process(() => {
    model.animation.type = 'STAND';
    model.animation.frame = 0;
  }));
}