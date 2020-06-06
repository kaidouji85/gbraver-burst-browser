// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {WingDozerModel} from "../model/wing-dozer-model";

/**
 * ノックバック
 *
 * @param model モデル
 * @return アニメーション
 */
export function knockBack(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.frame = 1;
    model.animation.type = 'KNOCK_BACK';
  })
    .chain(tween(model.position, t => t.to({x: '+20'}, 100)))
    .chain(tween(model.position, t => t.to({x: '-20'}, 100)));
}