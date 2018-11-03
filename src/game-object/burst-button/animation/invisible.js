// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BurstButtonModel} from "../model/burst-button-model";
import {tween} from "../../../animation/tween";
import {TweenAnimation} from "../../../animation/tween-animation";

/** バーストボタンを非表示にする */
export function invisible(model: BurstButtonModel, group: Group): TweenAnimation {
  return tween(new Tween(model, group)
    .to({opacity: 0}, 0)
  ).chain(
    tween(new Tween(model, group)
      .to({opacity: 1}, 300)
    )
  );
}