// @flow

import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {NeoLandozerSounds} from "../sounds/neo-landozer-sounds";

/** ガード -> 立ち */
export function guardToStand(model: NeoLandozerModel, sounds: NeoLandozerSounds): Animate {
  return process(() => {
    model.animation.frame = 1;
    model.animation.type = 'GUARD';
    sounds.motor.play();
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