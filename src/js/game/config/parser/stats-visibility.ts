import { z } from "zod";

import { StatsVisibility } from "../browser-config";

/** パフォーマンス情報の表示設定 zod schema */
export const StatsVisibilitySchema = z.union([
  z.literal("visible"),
  z.literal("hidden"),
]);

/**
 * StatsVisibilityにパースする
 * パースできない場合はnullを返す
 * @param origin パース元
 * @return パース結果
 */
export function parseStatsVisibility(origin: unknown): StatsVisibility | null {
  const result = StatsVisibilitySchema.safeParse(origin);
  return result.success ? result.data : null;
}
