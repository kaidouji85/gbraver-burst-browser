// @flow

import {NeoLandozerModel} from "../model/neo-landozer-model";
import {TweenAnimation} from "../../../../animation/tween-animation";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Tween} from '@tweenjs/tween.js';

/** 立ちポーズにする */
export function damage(model: NeoLandozerModel): TweenAnimation {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'DAMAGE';
  }).chain(
    tween(new Tween(model.animation)
      .to({frame: 1}, 300)
      .repeat(1)
      .yoyo(true)
    )
  );
}