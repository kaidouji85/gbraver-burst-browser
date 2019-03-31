// @flow

import type {BatterySelectorModel} from ".";
import {MIN_BATTERY} from ".";

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