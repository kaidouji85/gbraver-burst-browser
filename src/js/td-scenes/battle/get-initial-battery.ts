/**
 * バッテリーセレクタの初期値を計算する
 *
 * @param enableMaxBattery 設定可能バッテリーの上限値
 * @returns バッテリーセレクタの初期値
 */
export function getInitialBattery(enableMaxBattery: number): number {
  return 0 < enableMaxBattery ? 1 : 0;
}
