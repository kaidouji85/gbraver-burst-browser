// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../../animation/tween-animation";
import {tween} from "../../../../animation/tween";
import {process} from "../../../../animation/process";

/** パンチアニメーション */
export function punch(model: ShinBraverModel): TweenAnimation {
  return process(() => {
    model.animation.type = 'PUNCH';
    model.animation.frame = 0;
  }).chain(
    tween(new Tween(model.animation)
      .to({frame: 1}, 300)
      .repeat(1)
      .yoyo(true)
    )
  );
}