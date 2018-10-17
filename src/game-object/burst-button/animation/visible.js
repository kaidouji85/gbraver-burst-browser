// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BurstButtonModel} from "../model/burst-button-model";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";

/** バーストボタンを表示する */
export function visible(model: BurstButtonModel, group: Group): MultiTween {
  const start = new Tween(model, group)
    .to({opacity: 0}, 0);
  const end = new Tween(model, group)
    .to({opacity: 1}, 300);

  start.chain(end);
  return {
    start: start,
    end: end
  }
}