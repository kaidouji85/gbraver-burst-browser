// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

/**
 * アッパー -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function upperToStand(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'UPPER_TO_STAND';
    model.animation.frame = 0;
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 600)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}
