// @flow

import type {BatteryNumberModel} from "../model/battery-number-model";
import {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

/**
 * 数字を変更する
 *
 * @param model モデル
 * @param battery 変更する値
 * @return アニメーション
 */
export function change(model: BatteryNumberModel, battery: number): Animate {
  return process(() => {
    model.battery = battery;
  })
    .chain(tween(model, t => t.to({scale: 1.2}, 200)))
    .chain(tween(model, t => t.to({scale: 1}, 200)));
}