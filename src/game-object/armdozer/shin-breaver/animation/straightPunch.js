// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";

/** ストレートパンチ */
export function straightPunch(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'STRAIGHT_PUNCH';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 700)
    )
  ).chain(
    tween(model.animation, t => t
      .to({frame: 11/16}, 200)
    )
  )
}