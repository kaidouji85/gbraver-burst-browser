// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

/**
 * ダッシュ -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function dashToStand(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'DASH';
    model.animation.frame = 1;
  })
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}