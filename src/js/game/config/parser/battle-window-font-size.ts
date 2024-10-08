import { z } from "zod";

import { BattleWindowFontSize } from "../browser-config";

/** 戦闘ウィンドウ フォントサイズ zod schema */
export const BattleWindowFontSizeSchema = z.union([
  z.literal("small"),
  z.literal("normal"),
  z.literal("large"),
]);

/**
 * 任意のオブジェクトを戦闘ウィンドウ フォントサイズにパースする
 * @param origin パース元
 * @returns パース結果、パースできない場合はnull
 */
export function parseBattleWindowFontSize(
  origin: unknown,
): BattleWindowFontSize | null {
  const result = BattleWindowFontSizeSchema.safeParse(origin);
  return result.success ? result.data : null;
}
