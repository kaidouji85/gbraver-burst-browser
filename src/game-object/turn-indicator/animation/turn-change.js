// @flow

import {Tween, Group} from '@tweenjs/tween.js';
import type {TurnIndicatorModel} from "../model/turn-indicator-model";

/** ターン変更する */
export function turnChange(isPlayerTurn: boolean, model: TurnIndicatorModel, group: Group): Tween {
  return new Tween(model, group)
    .onStart(() => {
      model.isPlayerTurn = isPlayerTurn;
    })
    .to({opacity: 1}, 500)
}