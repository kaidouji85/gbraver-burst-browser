import type { BatterySelectorModel } from "../../src/js/game-object/battery-selector/model";

/** 空のバッテリーセレクタモデル */
export const EMPTY_BATTERY_SELECTOR: BatterySelectorModel = {
  battery: 0,
  maxBattery: 5,
  enableMaxBattery: 0,
  needle: 0,
  label: "Attack",
  opacity: 1,
  minusButtonScale: 1,
  plusButtonScale: 1,
  batteryButtonScale: 1,
  shouldPushNotifierStop: false,
  disabled: false,
};
