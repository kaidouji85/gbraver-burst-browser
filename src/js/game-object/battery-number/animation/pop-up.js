// @flow

import type {BatteryNumberModel} from "../model/battery-number-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import {process} from '../../../animation/process';

/**
 * バッテリー数字を表示する
 *
 * @param model モデル
 * @param battery バッテリーの値
 * @return アニメーション
 */
export function popUp(model: BatteryNumberModel, battery: number): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 1.5;
    model.battery = battery;
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 300)))
    .chain(delay(1500))
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.1}, 300)));
}