// @flow

import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {Tween, Group} from '@tweenjs/tween.js';
import {createEmptyTweenByGroup} from "../../../../tween/empty-tween";

/** パンチアニメーション */
export function punch(model: ShinBraverModel, group: Group): MultiTween {
  const start = createEmptyTweenByGroup(group);
  const charge = new Tween(model, group)
    .onStart(() => {
      model.animation.type = 'PUNCH';
      model.animation.frame = 0;
    })
    .to({
      animation: {
        frame: 0.5
      }
    }, 1000);
  const attack = new Tween(model, group)
    .to(model, {
      animation: {
        frame: 1
      }
    }, 300);
  const end = createEmptyTweenByGroup(group);

  return {
    start: start,
    end: end
  };
}