// @flow

import type {Command} from "gbraver-burst-core";

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

/**
 * 設定可能バッテリーの上限値を計算する
 *
 * @param commands プレイヤーが入力可能なコマンド
 * @return 設定可能バッテリーの上限値
 */
export function getEnableMax(commands: Command[]): number {
  return commands
    .map(v => {
      switch (v.type) {
        case 'BATTERY_COMMAND':
          return v.battery;
        default:
          return null;
      }
    })
    .filter(Boolean)
    .reduce((a, b) => Math.max(a, b), 0);
}