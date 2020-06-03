// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {WingDozerModel} from "../model/wing-dozer-model";

/**
 * 避け -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function avoidToStand(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  }).chain(
    tween(model.position, t => t
      .to({x: '-100'}, 500)
    )
  )
}