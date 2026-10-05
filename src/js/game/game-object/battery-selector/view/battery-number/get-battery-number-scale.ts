/**
 * バッテリーセレクタ数字のスケールを計算する
 * @param maxBattery 最大バッテリー数
 * @returns 計算結果
 */
export function getBatteryNumberScale(maxBattery: number): number {
  return maxBattery <= 5 ? 1 : 0.8;
}
