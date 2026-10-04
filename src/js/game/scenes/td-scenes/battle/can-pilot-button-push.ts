import type { Command } from "gbraver-burst-core";

/**
 * パイロットボタンが押せるか否かを判定する
 *
 * @param commands プレイヤーが選択可能なコマンド一覧
 * @returns 判定結果、trueでボタンが押せる
 */
export function canPilotButtonPush(commands: Command[]): boolean {
  const burstCommands = commands.filter(
    (v) => v.type === "PILOT_SKILL_COMMAND",
  );
  return 1 <= burstCommands.length;
}
