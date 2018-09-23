// @flow

/**
 * バッテリーセレクタの初期値を計算する
 *
 * @param enableMaxBattery 設定可能バッテリーの上限値
 * @return バッテリーセレクタの初期値
 */
export function getInitialBattery(enableMaxBattery: number): number {
  if (0 < enableMaxBattery) {
    return 1;
  } else {
    return 0;
  }
}