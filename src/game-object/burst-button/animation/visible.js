// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BurstButtonModel} from "../model/burst-button-model";
import {TweenAnimation} from "../../../animation/tween-animation";
import {tween} from "../../../animation/tween";

/** バーストボタンを表示する */
export function visible(model: BurstButtonModel, group: Group): TweenAnimation {
  return tween(new Tween(model, group)
    .to({opacity: 1}, 300)
  );
}