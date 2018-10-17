// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BurstButtonModel} from "../model/burst-button-model";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";

/** バーストボタンを非表示にする */
export function invisible(model: BurstButtonModel, group: Group): MultiTween {
  const start = new Tween(model, group)
    .to({opacity: 1}, 0);
  const end = new Tween(model, group)
    .to({opacity: 0}, 300);

  start.chain(end);
  return {
    start: start,
    end: end
  }
}