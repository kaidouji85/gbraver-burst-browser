// @flow

import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {Tween, Group} from '@tweenjs/tween.js';
import {createEmptyTweenByGroup} from "../../../../tween/empty-tween";

/** パンチアニメーション */
export function punch(model: ShinBraverModel, group: Group): MultiTween {
  const start = createEmptyTweenByGroup(group);
  const resetMotion = createEmptyTweenByGroup(group)
    .onStart(() => {
      model.animation.type = 'PUNCH';
      model.animation.frame = 0;
    });
  const attack = new Tween(model.animation, group)
    .to({frame: 1}, 1500);
  const end = createEmptyTweenByGroup(group);

  start.chain(resetMotion);
  resetMotion.chain(attack);
  attack.chain(end);

  return {
    start: start,
    end: end
  };
}