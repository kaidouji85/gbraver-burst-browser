// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../../animation/tween-animation";
import {tween} from "../../../../animation/tween";
import {process} from "../../../../animation/process";
import {delay} from "../../../../animation/delay";

/** パンチアニメーション */
export function punch(model: ShinBraverModel): TweenAnimation {
  return process(() => {
    model.animation.type = 'PUNCH';
    model.animation.frame = 0;
  }).chain(
    tween(new Tween(model.animation)
      .to({frame: 7/16}, 500)
    )
  ).chain(
   delay(1000)
  ).chain(
    tween(new Tween(model.animation)
      .to({frame: 1}, 150)
      .repeat(1)
      .yoyo(true)
    )
  ).chain(
    delay(1000)
  ).chain(
    tween(new Tween(model.animation)
      .to({frame: 0}, 500)
    )
  ).chain(
    delay(1000)
  );
}