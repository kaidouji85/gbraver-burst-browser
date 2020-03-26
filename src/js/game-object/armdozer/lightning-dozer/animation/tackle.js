// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";

/**
 * タックル
 *
 * @param model モデル
 * @return アニメーション
 */
export function tackle(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'TACKLE';
    model.animation.frame = 0;
  }).chain(all(
    tween(model.position, t => t.to({x: '-80'}, 100)),
    tween(model.animation, t => t.to({frame: 1}, 100))
  ));
}