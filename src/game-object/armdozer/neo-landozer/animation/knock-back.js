// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Tween} from '@tweenjs/tween.js';
import {empty} from "../../../../animation/delay";

/** ノックバック */
export function knockBack(model: NeoLandozerModel): Animate {
  const motion = process(() => {
    model.animation.frame = 0;
    model.animation.type = 'KNOCK_BACK';
  }).chain(
    tween(new Tween(model.animation)
      .to({frame: 1}, 100)
    )
  );

  const position = tween(new Tween(model.position)
    .to({x: '+20'}, 100)
  ).chain(tween(new Tween(model.position)
    .to({x: '-20'}, 100)
  ));

  return empty().chain(
    motion,
    position
  )
}