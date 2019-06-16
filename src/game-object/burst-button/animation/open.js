// @flow

import type {BurstButtonModel} from "../model/burst-button-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {process} from '../../../animation/process';

/** バーストボタンを表示する */
export function open(model: BurstButtonModel, disabled: boolean): Animate {
  return process(() => {
    model.disabled = disabled;
  }).chain(tween(model, t => t
    .to({opacity: 1}, 300)
  ));
}