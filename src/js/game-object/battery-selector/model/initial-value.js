// @flow

import type {BatterySelectorModel} from "./index";
import {MIN_BATTERY} from "./index";

/** モデルの初期値を生成する */
export function initialValue(): BatterySelectorModel {
  return {
    battery: MIN_BATTERY,
    enableMaxBattery: MIN_BATTERY,
    needle: 0,
    label: 'Attack',
    opacity: 0,
    disabled: true
  };
}