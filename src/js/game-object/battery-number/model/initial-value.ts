import type { BatteryNumberModel } from "./battery-number-model";

/**
 * バッテリー数字モデルの初期値を生成する
 *
 * @returns 生成結果
 */
export function createInitialValue(): BatteryNumberModel {
  return {
    opacity: 0,
    scale: 1,
    battery: 0,
  };
}
