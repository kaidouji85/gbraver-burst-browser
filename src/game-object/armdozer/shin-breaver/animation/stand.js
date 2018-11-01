// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ShinBraverModel} from "../model/shin-braver-model";
import {createEmptyTweenByGroup} from "../../../../depricated-tween/empty-tween";

/** 立ちポーズになる */
export function stand(model: ShinBraverModel, group: Group): Tween {
  return createEmptyTweenByGroup(group)
    .onStart(() => {
      model.animation.frame = 0;
      model.animation.type = 'STAND';
    });
}