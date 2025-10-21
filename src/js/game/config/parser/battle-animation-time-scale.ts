import { z } from "zod";

/** 戦闘アニメタイムスケール zod schema */
export const BattleAnimationTimeScaleSchema = z.preprocess(
  Number,
  z.union([z.literal(1), z.literal(0.5), z.literal(0.25)]),
);
