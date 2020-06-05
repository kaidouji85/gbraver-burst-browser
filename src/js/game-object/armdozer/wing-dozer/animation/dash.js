// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

/**
 * ダッシュ
 *
 * @param model モデル
 * @return アニメーション
 */
export function dash(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'DASH';
    model.animation.frame = 0;
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}