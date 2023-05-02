import { z } from "zod";

/** 戦闘アニメタイムスケール */
export type BattleAnimationTimeScale = number;

/** 設定可能な戦闘アニメタイムスケールをあつめたもの */
export const BattleAnimationTimeScales: BattleAnimationTimeScale[] = [
  1, 0.5, 0.25,
];

/** 戦闘アニメタイムスケール zod schema */
export const BattleAnimationTimeScaleSchema = z.union([
  z.preprocess(Number, z.literal(1)),
  z.preprocess(Number, z.literal(0.5)),
  z.preprocess(Number, z.literal(0.25)),
]);

/**
 * 任意のオブジェクトを戦闘アニメタイムスケールにパースする
 * パースできない場合はnullを返す
 *
 * @param origin パース元
 * @return パース結果
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseBattleAnimationTimeScale(
  origin: any
): BattleAnimationTimeScale | null {
  /* eslint-enable */
  const result = BattleAnimationTimeScaleSchema.safeParse(origin);
  return result.success ? result.data : null;
}