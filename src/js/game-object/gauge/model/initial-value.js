// @flow

import * as R from 'ramda';
import type {GaugeModel} from "./gauge-model";

/**
 * 初期値を生成する
 *
 * @param hp 最大HP
 * @param battery 最大バッテリー
 * @return 生成した初期値
 */
export function initialValue(hp: number, battery: number): GaugeModel {
  const maxBattery = Math.floor(battery);
  const batteryList = R.times(v => v + 1, maxBattery)
    .map(v => ({
      value: v,
      opacity: 1
    }));
  return {
    hp: hp,
    maxHp: hp,
    batteryList: batteryList
  };
}