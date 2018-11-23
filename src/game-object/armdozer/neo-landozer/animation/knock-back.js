// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {empty} from "../../../../animation/delay";

/** ノックバック */
export function knockBack(model: NeoLandozerModel): Animate {
  const motion = process(() => {
    model.animation.frame = 0;
    model.animation.type = 'KNOCK_BACK';
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 100)
    )
  );

  const position = tween(model.position, t => t
    .to({x: '+20'}, 100)
  ).chain(tween(model.position, t => t
    .to({x: '-20'}, 100)
  ));

  return empty().chain(
    motion,
    position
  )
}