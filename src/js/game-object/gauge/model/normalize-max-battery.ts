import { BatteryLimit } from "./gauge-model";

/**
 * 最大バッテリー値を正規化する
 * @param maxBattery 最大バッテリー
 * @returns 正規化結果
 */
export function normalizeMaxBattery(maxBattery: number): number {
  return Math.min(Math.floor(maxBattery), BatteryLimit);
}
