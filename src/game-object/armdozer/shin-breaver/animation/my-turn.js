// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {Tween, Group} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../../animation/tween-animation";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** マイターンのアニメーション */
export function myTurn(model: ShinBraverModel, group: Group): TweenAnimation {
  return process(() => {
    model.animation.type = 'MY_TURN';
    model.animation.frame = 0;
  }).chain(
    tween(new Tween(model.animation, group)
      .to({frame: 1}, 300)
    )
  );
}