import { z } from "zod";

/** パフォーマンス統計の表示設定 zod schema */
export const PerformanceStatsVisibilitySchema = z.union([
  z.literal("visible"),
  z.literal("hidden"),
]);
