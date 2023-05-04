import { z } from "zod";

import {
  BattleAnimationTimeScale,
  BattleAnimationTimeScales,
} from "../browser-config";

/** 戦闘アニメタイムスケール zod schema */
export const BattleAnimationTimeScaleSchema = z.preprocess(
  Number,
  z.union([
    z.literal(BattleAnimationTimeScales[0]),
    z.literal(BattleAnimationTimeScales[1]),
    ...BattleAnimationTimeScales.map((v) => z.literal(v)).slice(2),
  ])
);

/**
 * 任意のオブジェクトを戦闘アニメタイムスケールにパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
export function parseBattleAnimationTimeScale(
  origin: unknown
): BattleAnimationTimeScale | null {
  const result = BattleAnimationTimeScaleSchema.safeParse(origin);
  return result.success ? result.data : null;
}
