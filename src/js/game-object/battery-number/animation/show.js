// @flow

import {Animate} from "../../../animation/animate";
import type {BatteryNumberModel} from "../model/battery-number-model";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

/**
 * バッテリー数字を表示する
 *
 * @param model モデル
 * @param battery バッテリー値
 * @return アニメーション
 */
export function show(model: BatteryNumberModel, battery: number): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 1.5;
    model.battery = battery;
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 400)))
}