import type { Command } from "gbraver-burst-core";

/**
 * 設定可能バッテリーの上限値を計算する
 *
 * @param commands プレイヤーが入力可能なコマンド
 * @returns 設定可能バッテリーの上限値
 */
export function getEnableMaxBattery(commands: Command[]): number {
  return commands
    .map((command) =>
      command.type === "BATTERY_COMMAND" ? command.battery : 0,
    )
    .reduce((a, b) => Math.max(a, b), 0);
}
