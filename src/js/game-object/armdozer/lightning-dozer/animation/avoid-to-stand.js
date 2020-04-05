// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/**
 * 避け -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function avoidToStand(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  }).chain(
    tween(model.position, t => t
      .to({x: '-100'}, 500)
    )
  );
}