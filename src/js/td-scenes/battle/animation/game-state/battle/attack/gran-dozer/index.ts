import { BattleResult } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { empty } from "../../../../../../../animation/delay";
import { attack } from "./attack";
import { GranDozerBattle } from "./gran-dozer-battle";
import { guard } from "./guard";

/**
 * グランドーザ 攻撃アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function granDozerAttack(param: GranDozerBattle<BattleResult>): Animate {
  const { result } = param;
  switch (result.name) {
    case "NormalHit":
    case "CriticalHit":
      return attack({ ...param, result });
    case "Guard":
      return guard({ ...param, result });
    default:
      return empty();
  }
}
