// @flow

import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/** 非表示にする */
export function invisible(model: TurnIndicatorModel): Animate {
  return tween(model, t => t
    .to({opacity: 0}, 500)
  );
}