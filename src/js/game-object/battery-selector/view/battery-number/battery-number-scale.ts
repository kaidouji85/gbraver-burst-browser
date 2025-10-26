/**
 * バッテリーセレクタ数字のスケールを計算する
 * @param maxBattery
 * @returns 計算結果
 */
export function batteryNumberScale(maxBattery: number): number {
  return maxBattery <= 5 ? 1 : 0.8;
}
