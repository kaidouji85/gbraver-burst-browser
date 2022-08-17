// @flow
import type {Command} from "gbraver-burst-core";

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

/**
 * バーストが操作可能か否かを判定する
 *
 * @param commands プレイヤーコマンド
 * @return 判定結果、trueで操作可能
 */
export function canBurstButtonPush(commands: Command[]): boolean {
  const burstCommands = commands.filter(v => v.type === 'BURST_COMMAND');
  return 1 <= burstCommands.length;
}

/**
 * パイロットボタンが押せるか否かを判定する
 *
 * @param commands プレイヤーが選択可能なコマンド一覧
 * @return 判定結果、trueでボタンが押せる
 */
export function canPilotButtonPush(commands: Command[]): boolean {
  const burstCommands = commands.filter(v => v.type === 'PILOT_SKILL_COMMAND');
  return 1 <= burstCommands.length;
}