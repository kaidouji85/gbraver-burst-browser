// @flow

import {TweenAnimation} from "../../../../animation/tween-animation";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Tween} from '@tweenjs/tween.js';
import {delay} from "../../../../animation/delay";

export function frontStep(model: ShinBraverModel): TweenAnimation {
  return process(() => {
    model.animation.type = 'STAND';
  }).chain(
    tween(new Tween(model.position)
      .to({x: '-60', z: '+1'}, 300)
    )
  ).chain(delay(1000));
}