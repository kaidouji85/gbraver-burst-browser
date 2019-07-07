// @flow

import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";

/** アームハンマー */
export function armHammer(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.type = 'HM_ATTACK';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 150)
    ),
    tween(model.position, t => t
      .to({x: '-100'}, 150)
    )
  );
}