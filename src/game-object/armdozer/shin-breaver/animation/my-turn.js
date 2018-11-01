// @flow

import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {Tween, Group} from '@tweenjs/tween.js';
import {createEmptyTweenByGroup} from "../../../../tween/empty-tween";

export function myTurn(model: ShinBraverModel, group: Group): MultiTween {
  const start = createEmptyTweenByGroup(group)
    .onStart(() => {
      model.animation.type = 'MY_TURN';
      model.animation.frame = 0;
    });
  const animation = new Tween(model.animation, group)
    .to({frame: 1}, 300);

  start.chain(animation);

  return {
    start: start,
    end: animation
  };
}