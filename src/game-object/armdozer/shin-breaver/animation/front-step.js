// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

export function frontStep(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'STAND';
  }).chain(
    tween(model.position, t => t
      .to({x: '-60', z: '+1'}, 300)
    )
  ).chain(delay(1000));
}