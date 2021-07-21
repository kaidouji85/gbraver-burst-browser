// @flow

import type {BatteryCorrectModel} from "../model/battery-correct-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/**
 * 非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: BatteryCorrectModel): Animate {
  return tween(model, t => t.to({opacity: 0, scale: 1.1}, 300));
}