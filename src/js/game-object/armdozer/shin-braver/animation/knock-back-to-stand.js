// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {ShinBraverModel} from "../model/shin-braver-model";

/** ノックバック -> 立ち */
export function knockBackToStand(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.frame = 1;
    model.animation.type = 'KNOCK_BACK';
  }).chain(
    tween(model.animation, t => t
      .to({frame: 0}, 300)
    )
  ).chain(
    process(() => {
      model.animation.frame = 0;
      model.animation.type = 'STAND';
    })
  );
}