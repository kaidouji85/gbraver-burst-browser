import { z } from "zod";
import {BattleControllerType} from "../../../td-scenes/battle/controller-type";

/** 戦闘シーンコントローラータイプ　zod schema */
export const BattleControllerTypeSchema = z.union([
  z.literal("BigButton"),
  z.literal("MiniController")
]);

/**
 * 任意のオブジェクトを戦闘シーンコントローラータイプにパースする
 * パースできない場合はnullを返す
 * @param origin パース元
 * @return パース結果
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseBattleControllerType(origin: any): BattleControllerType | null {
  /* eslint-enable */
  const result = BattleControllerTypeSchema.safeParse(origin);
  return result.success ? result.data : null;
}