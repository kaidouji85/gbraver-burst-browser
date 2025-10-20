import { z } from "zod";

/** ロボ、パイロット選択タイプ zod schema */
export const PlayerSelectorTypeSchema = z.union([
  z.literal("open"),
  z.literal("secret"),
]);
