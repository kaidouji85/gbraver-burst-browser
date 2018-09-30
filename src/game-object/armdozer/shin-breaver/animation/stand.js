// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ShinBraverModel} from "../model/shin-braver-model";
import {createEmptyTweenByGroup} from "../../../../tween/empty-tween";

/** 立ちポーズのアニメーション、本アニメーションは無限アニメーションである */
export function stand(model: ShinBraverModel, group: Group): Tween {
  const start = createEmptyTweenByGroup(group)
    .onStart(() => {
      model.animation.frame = 0;
      model.animation.type = 'STAND';
    });
  const upDown = new Tween(model.animation, group)
    .to({frame: 1}, 1000)
    .yoyo(true)
    .repeat(Infinity);

  start.chain(upDown);

  return start;
}