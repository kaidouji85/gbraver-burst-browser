// @flow

import {Tween} from '@tweenjs/tween.js';
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

/** ターン変更する */
export function turnChange(isPlayerTurn: boolean, model: TurnIndicatorModel): Animate {
  return process(() => {
    model.isPlayerTurn = isPlayerTurn;
  }).chain(
    tween(new Tween(model)
      .to({opacity: 1}, 500)
    )
  );
}