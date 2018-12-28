// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** スチレートパンチから立ちポーズに移行 */
export function spToStand(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'SP_TO_STAND';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 500)
    )
  ).chain(
    process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    })
  )
}