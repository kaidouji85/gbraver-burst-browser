// @flow

import type {BurstButtonModel} from "../model/burst-button-model";
import {tween} from "../../../animation/tween";
import {Animate} from "../../../animation/animate";

/** バーストボタンを非表示にする */
export function invisible(model: BurstButtonModel): Animate {
  return tween(model, t => t
    .to({opacity: 0}, 300)
  );
}