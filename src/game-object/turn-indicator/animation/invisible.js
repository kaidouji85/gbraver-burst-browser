// @flow

import {Tween, Group} from '@tweenjs/tween.js';
import type {TurnIndicatorModel} from "../model/turn-indicator-model";

/** 非表示にする */
export function invisible(model: TurnIndicatorModel, group: Group): Tween {
  return new Tween(model, group)
    .to({opacity: 0}, 500);
}