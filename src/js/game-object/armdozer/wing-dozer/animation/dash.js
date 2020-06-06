// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {delay} from "../../../../animation/delay";

/**
 * ダッシュ
 *
 * @param model モデル
 * @return アニメーション
 */
export function dash(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'DASH_UP';
    model.animation.frame = 0;
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 300)))
    .chain(delay(100))
    .chain(process(() => {
      model.animation.type = 'DASH_DOWN';
      model.animation.frame = 0;
    }))
    .chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}