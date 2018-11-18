// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {TweenAnimation} from "../../../../animation/tween-animation";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Tween} from '@tweenjs/tween.js';

/** ノックバック */
export function knockBack(model: NeoLandozerModel): TweenAnimation {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'KNOCK_BACK';
  }).chain(
    tween(new Tween(model.animation)
      .to({frame: 1}, 50)
    )
  );
}