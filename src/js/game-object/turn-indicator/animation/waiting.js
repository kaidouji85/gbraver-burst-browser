// @flow

import {Animate} from "../../../animation/animate";
import type {TurnIndicatorModel} from "../model/turn-indicator-model";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
/**
 * 待ちアニメ
 *
 * @param model モデル
 * @return アニメーション
 */
export function waiting(model: TurnIndicatorModel): Animate {
  return tween(model, t => t.to({x: '-50'}, 500))
    .chain(delay(150))
    .chain(tween(model, t => t.to({x: '+50'}, 0)));
}