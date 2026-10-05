import { Command } from "gbraver-burst-core";

/**
 * 指定したバッテリーのコマンドを取得する
 * @param battery バッテリー値
 * @param commands コマンドリスト
 * @returns 取得結果、存在しない場合はundefined
 */
export const findBatteryCommand = (battery: number, commands: Command[]) =>
  commands.find((c) => c.type === "BATTERY_COMMAND" && c.battery === battery);
