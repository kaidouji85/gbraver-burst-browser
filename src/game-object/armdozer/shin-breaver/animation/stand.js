// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ShinBraverModel} from "../model/shin-braver-model";
import {TweenAnimation} from "../../../../animation/tween-animation";
import {process} from "../../../../animation/process";

/** 立ちポーズになる */
export function stand(model: ShinBraverModel, group: Group): TweenAnimation {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  });
}