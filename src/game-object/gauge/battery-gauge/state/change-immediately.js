// @flow

import {BatteryGaugeState} from '../base';
import type {BatteryGaugeModel} from '../base';


/**
 * 指定したバッテリー値に即座に変更する
 */
export class ChangeImmediately implements BatteryGaugeState {
  _battery: number;

  /** 状態開始 */
  start(toBattery: number) {
    this._battery = toBattery;
  }

  /** ゲームループの処理 */
  gameLoop(model: BatteryGaugeModel): BatteryGaugeModel {
    return Object.assign({}, model, {battery: this._battery});
  }
}
