// @flow

import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {empty} from "../../../../animation/delay";
import {all} from "../../../../animation/all";

/** ノックバック */
export function knockBack(model: NeoLandozerModel): Animate {
  const motion = process(() => {
    model.animation.frame = 1;
    model.animation.type = 'KNOCK_BACK';
  });
  const position = tween(model.position, t => t
    .to({x: '+20'}, 100)
  ).chain(tween(model.position, t => t
    .to({x: '-20'}, 100)
  ));

  return empty().chain(
    all(
      motion,
      position
    )
  )
}