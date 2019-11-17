// @flow

import TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../animation/animate";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
/**
 * 待ちアニメ
 *
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function waiting(model: TurnIndicatorModel, group: TWEEN.Group): Animate {
  return tween(model, t => t.to({animation: 1}, 500), group)
    .chain(delay(150, group))
    .chain(tween(model, t => t.to({animation: 1}, 0), group));
}