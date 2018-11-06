// @flow

import {Tween} from '@tweenjs/tween.js';
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {TweenAnimation} from "../../../animation/tween-animation";
import {tween} from "../../../animation/tween";

/** 非表示にする */
export function invisible(model: TurnIndicatorModel): TweenAnimation {
  return tween(new Tween(model)
    .to({opacity: 0}, 500)
  );
}