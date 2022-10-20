// @flow

import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import type { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/** 避ける */
export function avoid(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds
): Animate {
  return process(() => {
    model.animation.type = "BACK_STEP";
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(
      all(
        tween(model.animation, (t) => t.to({ frame: 1 }, 300)),
        tween(model.position, (t) => t.to({ x: "+100" }, 300))
      )
    )
    .chain(delay(300))
    .chain(
      process(() => {
        sounds.motor.play();
      })
    )
    .chain(tween(model.animation, (t) => t.to({ frame: 0 }, 300)))
    .chain(
      process(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
      })
    );
}
