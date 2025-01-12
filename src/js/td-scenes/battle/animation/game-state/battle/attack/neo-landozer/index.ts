import { BattleResult } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { empty } from "../../../../../../../animation/delay";
import { attack } from "./attack";
import { down } from "./down";
import { feint } from "./feint";
import { guard } from "./guard";
import { miss } from "./miss";
import { NeoLandozerBattle } from "./neo-landozer-battle";

/**
 * ネオランドーザの攻撃アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function neoLandozerAttack(
  param: NeoLandozerBattle<BattleResult>,
): Animate {
  let ret = empty();

  const { result } = param;
  if (
    param.isDeath &&
    (result.name === "NormalHit" ||
      result.name === "CriticalHit" ||
      result.name === "Guard")
  ) {
    ret = down({ ...param, result });
  } else if (result.name === "NormalHit") {
    ret = attack({ ...param, result });
  } else if (result.name === "CriticalHit") {
    ret = attack({ ...param, result });
  } else if (result.name === "Guard") {
    ret = guard({ ...param, result });
  } else if (result.name === "Miss") {
    ret = miss({ ...param, result });
  } else if (result.name === "Feint") {
    ret = feint({ ...param, result });
  }

  return ret;
}
