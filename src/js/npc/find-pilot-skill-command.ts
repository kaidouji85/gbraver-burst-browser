import { Command } from "gbraver-burst-core";

/**
 * パイロットスキルコマンドを取得する
 * @param commands コマンドリスト
 * @returns 取得結果、存在しない場合はundefined
 */
export const findPilotSkillCommand = (commands: Command[]) =>
  commands.find((c) => c.type === "PILOT_SKILL_COMMAND");
