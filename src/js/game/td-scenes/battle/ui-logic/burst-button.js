// @flow

import type {Command} from "gbraver-burst-core/lib/command/command";

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