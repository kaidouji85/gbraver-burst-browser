// @flow

import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";
import {delay} from "../../../../animation/delay";
import type {NeoLandozerModel} from "../model/neo-landozer-model";

/** ストレートパンチ */
export function straightPunch(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.type = 'SP_CHARGE';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 300)
    )
  ).chain(
    delay(500)
  ).chain(
    process(() => {
      model.animation.type = 'SP_ATTACK';
      model.animation.frame = 0;
    })
  ).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 150)
    )
  ).chain(
    delay(200)
  ).chain(
    process(() => {
      model.animation.type = 'SP_TO_STAND';
      model.animation.frame = 0;
    })
  ).chain(
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