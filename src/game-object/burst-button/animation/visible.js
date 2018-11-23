// @flow

import type {BurstButtonModel} from "../model/burst-button-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/** バーストボタンを表示する */
export function visible(model: BurstButtonModel): Animate {
  return tween(model, t => t
    .to({opacity: 1}, 300)
  );
}