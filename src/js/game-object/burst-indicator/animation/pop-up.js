// @flow

import {delay} from "../../../animation/delay";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import type {BurstIndicatorModel} from "../model/burst-indicator-model";

/**
 * ポップアップ
 *
 * @param model モデル
 * @return アニメーション
 */
export function popUp(model: BurstIndicatorModel): Animate {
  return tween(model, t => t.to({opacity: 0}, 0))
    .chain(tween(model, t => t.to({opacity: 1}, 300)))
    .chain(delay(1000))
    .chain(tween(model, t => t.to({opacity: 0}, 300)));
}