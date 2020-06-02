// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

/**
 * チャージ
 *
 * @param model モデル
 * @return アニメーション
 */
export function charge(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'UPPER_CHARGE';
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}
