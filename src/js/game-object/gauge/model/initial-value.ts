import * as R from "ramda";

import type { GaugeModel } from "./gauge-model";
import { BatteryLimit } from "./gauge-model";
import {getOpacity} from "./get-opacity";
import {normalizeMaxBattery} from "./normalize-max-battery";

/**
 * 初期値を生成する
 * @param hp 最大HP
 * @param battery 最大バッテリー
 * @return 生成した初期値
 */
export function initialValue(hp: number, battery: number): GaugeModel {
  const maxBattery = normalizeMaxBattery(battery);
  const batteryList = R.times((v) => v + 1, BatteryLimit).map((v) => ({
    value: v,
    opacity: getOpacity(v, maxBattery),
    brightness: 1,
  }));
  return {
    hp: hp,
    maxHp: hp,
    maxBattery,
    batteryList,
    tracking: {
      x: 0,
      y: 0,
    },
  };
}
