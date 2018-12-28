// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";
import {delay} from "../../../../animation/delay";

/** ストレートパンチ */
export function straightPunch(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'SP_CHARGE';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 500)
    )
  ).chain(
    delay(300)
  ).chain(
    process(() => {
      model.animation.type = 'SP_ATTACK';
      model.animation.frame = 0;
    })
  ).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 250)
      .repeat(1)
      .yoyo(true)
    )
  ).chain(
    process(() => {
      model.animation.type = 'SP_CHARGE';
      model.animation.frame = 1;
    })
  )
}