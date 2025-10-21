import { z } from "zod";

/** 戦闘シーンコントローラータイプ zod schema */
export const BattleControllerTypeSchema = z.union([
  z.literal("BigButton"),
  z.literal("MiniController"),
]);
