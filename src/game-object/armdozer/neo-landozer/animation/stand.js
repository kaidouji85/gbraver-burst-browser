// @flow

import {Tween} from '@tweenjs/tween.js';
import {NeoLandozerModel} from "../model/neo-landozer-model";
import {TweenAnimation} from "../../../../animation/tween-animation";
import {process} from "../../../../animation/process";

/** 立ちポーズにする */
export function stand(model: NeoLandozerModel): TweenAnimation {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  });
}