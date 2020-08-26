// @flow

import TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../animation/animate";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import {process} from '../../../animation/process';

/**
 * 待ちアニメ
 *
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function waiting(model: TurnIndicatorModel, group: typeof TWEEN.Group): Animate {
  return process(() => {
    model.animation = 0;
  },group
  ).chain(tween(model, t => t.to({animation: 1}, 500), group)
  ).chain(delay(150, group));
}