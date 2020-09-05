// @flow

import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import type {BatteryNumberModel} from "../model/battery-number-model";

/**
 * バッテリー数字を消す
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: BatteryNumberModel): Animate {
  return tween(model, t => t.to({opacity: 0, scale: 1.1}, 300))
}