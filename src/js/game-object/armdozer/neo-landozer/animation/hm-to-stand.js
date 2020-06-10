// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {NeoLandozerSounds} from "../sounds/neo-landozer-sounds";

/** アームハンマー -> 立ち */
export function hmToStand(model: NeoLandozerModel, sounds: NeoLandozerSounds): Animate {
  return process(() => {
    model.animation.type = 'HM_TO_STAND';
    model.animation.frame = 0;
    sounds.motor.play();
  }).chain(
    tween(model.animation, t => t.to({frame: 1}, 300)),
    tween(model.position, t => t.to({x: '+100'}, 300)),
  ).chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    })
  );
}