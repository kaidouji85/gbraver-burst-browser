/**
 * バッテリー値からメーター針の値を計算する
 * @param battery 現在のバッテリー
 * @param maxBattery バッテリー最大値
 * @returns メーター針の値
 */
export function getNeedleValue(battery: number, maxBattery: number): number {
  return battery / maxBattery;
}
