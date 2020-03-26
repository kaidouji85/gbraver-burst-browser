// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from '../../../../animation/process';

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
  });
}