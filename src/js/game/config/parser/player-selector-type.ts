import { z } from "zod";

import { PlayerSelectorType } from "../browser-config";

/** ロボ、パイロット選択タイプ zod schema */
export const PlayerSelectorTypeSchema = z.union([
  z.literal("open"),
  z.literal("secret"),
]);

/**
 * 任意のオブジェクトをロボ、パイロット選択タイプにパースする
 * パースできない場合はnullを返す
 * @param origin パース元
 * @returns パース結果
 */
export function parsePlayerSelectorType(
  origin: unknown,
): PlayerSelectorType | null {
  const result = PlayerSelectorTypeSchema.safeParse(origin);
  return result.success ? result.data : null;
}
