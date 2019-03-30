// @flow

import type {BatterySelectorModel} from "./battery-selector-model";

/** モデルの初期値を生成する */
export function initialValue(): BatterySelectorModel {
  return {
    battery: 0,
    needle: 0
  };
}