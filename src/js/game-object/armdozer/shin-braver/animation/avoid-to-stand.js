// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {ShinBraverSounds} from "../sounds/shin-braver-sounds";

/** 避け -> 立ち */
export function avoidToStand(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  }).chain(
    tween(model.position, t => t
      .to({x: '-100'}, 500)
    )
  )
}