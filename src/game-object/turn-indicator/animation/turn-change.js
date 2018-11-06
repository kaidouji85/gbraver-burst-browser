// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {TweenAnimation} from "../../../animation/tween-animation";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

/** ターン変更する */
export function turnChange(isPlayerTurn: boolean, model: TurnIndicatorModel, group: Group): TweenAnimation {
  return process(() => {
    model.isPlayerTurn = isPlayerTurn;
  }).chain(
    tween(new Tween(model, group)
      .to({opacity: 1}, 500)
    )
  );
}