import { BattleResult } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { empty } from "../../../../../../../animation/delay";
import { attack } from "./attack";
import { down } from "./down";
import { feint } from "./feint";
import { guard } from "./guard";
import { miss } from "./miss";
import { ShinBraverBattle } from "./shin-braver-battle";

/**
 * シンブレイバーの攻撃アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function shinBraverAttack(
  param: ShinBraverBattle<BattleResult>,
): Animate {
  let ret = empty();

  const { result } = param;
  if (param.isDeath && result.name === "NormalHit") {
    ret = down({ ...param, result });
  } else if (result.name === "NormalHit") {
    ret = attack({ ...param, result });
  } else if (param.isDeath && result.name === "CriticalHit") {
    ret = down({ ...param, result });
  } else if (result.name === "CriticalHit") {
    ret = attack({ ...param, result });
  } else if (param.isDeath && result.name === "Guard") {
    return down({ ...param, result });
  } else if (result.name === "Guard") {
    return guard({ ...param, result });
  } else if (result.name === "Miss") {
    ret = miss({ ...param, result });
  } else if (result.name === "Feint") {
    ret = feint({ ...param, result });
  }

  return ret;
}
