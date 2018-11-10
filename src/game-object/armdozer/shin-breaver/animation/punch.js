// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../../animation/tween-animation";
import {tween} from "../../../../animation/tween";
import {process} from "../../../../animation/process";
import {delay, empty} from "../../../../animation/delay";

/** パンチアニメーション */
export function punch(model: ShinBraverModel): TweenAnimation {
  const animation = process(() => {
    model.animation.type = 'PUNCH';
    model.animation.frame = 0;
  }).chain(
    tween(new Tween(model.position)
      .to({x: '-80'}, 300))
  ).chain(
   delay(1000)
  ).chain(
    tween(new Tween(model.animation)
      .to({frame: 1}, 200)
      .repeat(1)
      .yoyo(true)
    )
  ).chain(
    tween(new Tween(model.position)
      .to({x: '+80'}, 300))
  );

  return empty()
    .chain(
      delay(1400),
      animation
    )
}