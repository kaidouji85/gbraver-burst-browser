import * as R from "ramda";

import type { GaugeModel } from "./gauge-model";
import { BatteryLimit } from "./gauge-model";
import { getBatteryGaugeUnitOpacity } from "./get-battery-gauge-unit-opacity";
import { normalizeMaxBattery } from "./normalize-max-battery";

/**
 * 初期値を生成する
 * @param hp 最大HP
 * @param battery 最大バッテリー
 * @returns 生成した初期値
 */
export function initialValue(hp: number, battery: number): GaugeModel {
  const maxBattery = normalizeMaxBattery(battery);
  const batteryList = R.times((v) => v + 1, BatteryLimit).map((v) => ({
    value: v,
    opacity: getBatteryGaugeUnitOpacity(v, maxBattery),
    brightness: 1,
  }));
  return {
    hp,
    maxHp: hp,
    maxBattery,
    batteryList,
    tracking: {
      x: 0,
      y: 0,
    },
  };
}
