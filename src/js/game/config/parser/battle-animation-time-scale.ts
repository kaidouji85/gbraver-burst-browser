import { z } from "zod";

import { BattleAnimationTimeScale } from "../browser-config";

/** 戦闘アニメタイムスケール zod schema */
export const BattleAnimationTimeScaleSchema = z.preprocess(
  Number,
  z.union([z.literal(1), z.literal(0.5), z.literal(0.25)]),
);

/**
 * 任意のオブジェクトを戦闘アニメタイムスケールにパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @returns パース結果
 */
export function parseBattleAnimationTimeScale(
  origin: unknown,
): BattleAnimationTimeScale | null {
  const result = BattleAnimationTimeScaleSchema.safeParse(origin);
  return result.success ? result.data : null;
}
