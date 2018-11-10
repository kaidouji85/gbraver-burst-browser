// @flow

import {TweenAnimation} from "../../../../animation/tween-animation";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Tween} from "@tweenjs/tween.js";

/** ターン交代アニメーション */
export function turnChange(model: ShinBraverModel): TweenAnimation {
  return process(() => {
    model.animation.type = 'MY_TURN';
    model.animation.frame = 1;
  }).chain(
    tween(new Tween(model.animation)
      .to({frame: 0}, 300)
    )
  );
}