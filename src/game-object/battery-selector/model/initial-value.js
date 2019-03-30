// @flow

import type {BatterySelectorModel} from "./battery-selector-model";
import {MIN_BATTERY} from "./battery-selector-model";

/** モデルの初期値を生成する */
export function initialValue(): BatterySelectorModel {
  return {
    battery: MIN_BATTERY,
    enableMaxBattery: MIN_BATTERY,
    needle: 0,
    label: 'Attack',
  };
}