// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** チャージ */
export function charge(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.type = 'HM_CHARGE';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 300)
    )
  );
}