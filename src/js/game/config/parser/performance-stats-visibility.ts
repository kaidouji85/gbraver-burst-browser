import { z } from "zod";

import { PerformanceStatsVisibility } from "../browser-config";

/** パフォーマンス統計の表示設定 zod schema */
export const PerformanceStatsVisibilitySchema = z.union([
  z.literal("visible"),
  z.literal("hidden"),
]);

/**
 * PerformanceStatsVisibilityにパースする
 * パースできない場合はnullを返す
 * @param origin パース元
 * @return パース結果
 */
export function parsePerformanceStatsVisibility(
  origin: unknown,
): PerformanceStatsVisibility | null {
  const result = PerformanceStatsVisibilitySchema.safeParse(origin);
  return result.success ? result.data : null;
}
