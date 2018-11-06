// @flow

import {Tween} from '@tweenjs/tween.js';
import type {BurstButtonModel} from "../model/burst-button-model";
import {tween} from "../../../animation/tween";
import {TweenAnimation} from "../../../animation/tween-animation";

/** バーストボタンを非表示にする */
export function invisible(model: BurstButtonModel): TweenAnimation {
  return tween(new Tween(model)
    .to({opacity: 0}, 300)
  );
}