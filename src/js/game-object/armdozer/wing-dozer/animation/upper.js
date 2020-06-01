// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

/**
 * アッパー
 *
 * @param model モデル
 * @return アニメーション
 */
export function upper(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'UPPER_ATTACK';
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({frame: 1}, 150)));
}
