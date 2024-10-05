import { z } from "zod";

/** バトルウィンドウフォントサイズ zod schema */
export const BattleWindowFontSizeSchema = z.union([
  z.literal("small"),
  z.literal("normal"),
  z.literal("large"),
]);
