// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** 避け -> 立ち */
export function avoidToStand(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  }).chain(
    tween(model.position, t => t
      .to({x: '-100'}, 500)
    )
  )
}