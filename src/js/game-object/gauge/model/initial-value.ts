import * as R from "ramda";

import type { GaugeModel } from "./gauge-model";
import {BatteryLimit} from "./gauge-model";

/**
 * 初期値を生成する
 * @param hp 最大HP
 * @param battery 最大バッテリー
 * @return 生成した初期値
 */
export function initialValue(hp: number, battery: number): GaugeModel {
  const batteryList = R.times((v) => v + 1, BatteryLimit).map((v) => ({
    value: v,
    opacity: 1,
  }));
  return {
    hp: hp,
    maxHp: hp,
    maxBattery: Math.floor(battery),
    batteryList,
    tracking: {
      x: 0,
      y: 0,
    },
  };
}
