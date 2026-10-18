import type { BatterySelectorModel } from "./index";
import { MIN_BATTERY } from "./index";

/**
 * モデルの初期値を生成する
 *
 * @returns 生成した初期値
 */
export function initialValue(): BatterySelectorModel {
  return {
    battery: MIN_BATTERY,
    maxBattery: 5,
    enableMaxBattery: MIN_BATTERY,
    needle: 0,
    label: "Attack",
    opacity: 0,
    minusButtonScale: 1,
    plusButtonScale: 1,
    batteryButtonScale: 1,
    shouldPushNotifierStop: true,
  };
}
