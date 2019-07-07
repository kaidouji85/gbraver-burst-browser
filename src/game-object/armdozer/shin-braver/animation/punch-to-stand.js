// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";

/** ストレートパンチ -> 立ち */
export function punchToStand(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'SP_TO_STAND';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 400)
    ),
    tween(model.position, t => t
      .to({x: '+80'}, 400)
    ),
  ).chain(
    process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    })
  );
}
