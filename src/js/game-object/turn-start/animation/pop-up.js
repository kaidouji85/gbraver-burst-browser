// @flow

import type {TurnStartModel} from "../model/turn-start-model";
import {delay} from "../../../animation/delay";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/**
 * ポップアップ
 *
 * @param model モデル
 * @return アニメーション
 */
export function popUp(model: TurnStartModel): Animate {
  return tween(model, t => t.to({opacity: 1}, 300))
    .chain(delay(1000))
    .chain(tween(model, t => t.to({opacity: 0}, 300)));
}