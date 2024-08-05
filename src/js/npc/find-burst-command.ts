import { Command } from "gbraver-burst-core";

/**
 * バーストコマンドを取得する
 * @param commands コマンドリスト
 * @returns 取得結果、存在しない場合はundefined
 */
export const findBurstCommand = (commands: Command[]) =>
  commands.find((c) => c.type === "BURST_COMMAND");
