// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from '../../../../animation/process';

/**
 * タックル -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function tackleToStand(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'STAND';
    model.animation.frame = 0;
  });
}