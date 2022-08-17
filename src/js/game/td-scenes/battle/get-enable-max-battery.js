// @flow
import type {Command} from "gbraver-burst-core";

/**
 * 設定可能バッテリーの上限値を計算する
 *
 * @param commands プレイヤーが入力可能なコマンド
 * @return 設定可能バッテリーの上限値
 */
 export function getEnableMaxBattery(commands: Command[]): number {
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