import { z } from "zod";

import {BattleControllerType, BattleControllerTypes} from "../../../td-scenes/battle/controller-type";
import {DefaultConfig} from "../default-config";

/** 戦闘シーンコントローラータイプ zod schema */
export const BattleControllerTypeSchema = z.union([
  z.literal(BattleControllerTypes[0]),
  z.literal(BattleControllerTypes[1]),
  ...BattleControllerTypes.map((type) => z.literal(type))
    .slice(2),
]).catch(DefaultConfig.battleControllerType);

/**
 * 任意のオブジェクトを戦闘シーンコントローラータイプにパースする
 * パースできない場合はデフォルト値を返す
 * @param origin パース元
 * @return パース結果
 */
export function parseBattleControllerType(
  origin: unknown
): BattleControllerType {
  return BattleControllerTypeSchema.parse(origin);
}
