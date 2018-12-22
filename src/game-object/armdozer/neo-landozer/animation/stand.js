// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** 立ちポーズにする */
export function stand(model: NeoLandozerModel): Animate {
  return tween(model.animation, t => t
    .to({frame: 0}, 500)
  ).chain(
    process(() => {
      model.animation.type = 'STAND';
    })
  );
}