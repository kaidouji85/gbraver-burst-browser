// @flow

import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";
import {delay} from "../../../../animation/delay";
import type {NeoLandozerModel} from "../model/neo-landozer-model";

/** アームハンマー */
export function armHammer(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.type = 'HM_CHARGE';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 300)
    )
  ).chain(
    delay(400)
  ).chain(
    process(() => {
      model.animation.type = 'HM_ATTACK';
      model.animation.frame = 0;
    })
  ).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 150)
    )
  ).chain(
    delay(500)
  ).chain(
    process(() => {
      model.animation.type = 'HM_TO_STAND';
      model.animation.frame = 0;
    })
  ).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 300)
    )
  ).chain(
    process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    })
  )
}