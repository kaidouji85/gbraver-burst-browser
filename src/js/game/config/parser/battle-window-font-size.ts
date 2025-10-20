import { z } from "zod";

/** 戦闘ウィンドウ フォントサイズ zod schema */
export const BattleWindowFontSizeSchema = z.union([
  z.literal("small"),
  z.literal("normal"),
  z.literal("large"),
]);
