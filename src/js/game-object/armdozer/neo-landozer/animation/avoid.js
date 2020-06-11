// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {NeoLandozerSounds} from "../sounds/neo-landozer-sounds";
import {all} from "../../../../animation/all";

/** 避ける */
export function avoid(model: NeoLandozerModel, sounds: NeoLandozerSounds): Animate {
  return process(() => {
    model.animation.type = 'BACK_STEP';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(all(
      tween(model.animation, t => t.to({frame: 1}, 300)),
      tween(model.position, t => t.to({x: '+100'}, 300))
    ));
}