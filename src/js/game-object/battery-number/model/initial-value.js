// @flow

import type {BatteryNumberModel} from "./battery-number-model";

/**
 * バッテリー数字モデルの初期値を生成する
 *
 * @return 生成結果
 */
export function createInitialValue(): BatteryNumberModel {
  return {
    alpha: 0,
    battery: 0
  };
}