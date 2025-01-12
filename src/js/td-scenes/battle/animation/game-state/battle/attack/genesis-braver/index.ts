import {
  BattleResult,
  CriticalHit,
  Feint,
  Guard,
  Miss,
  NormalHit,
} from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { empty } from "../../../../../../../animation/delay";
import { attack } from "./attack";
import { down } from "./down";
import { feint } from "./feint";
import { GenesisBraverBattle } from "./genesis-braver-battle";
import { guard } from "./guard";
import { miss } from "./miss";

/**
 * ジェネシスブレイバー 攻撃アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function genesisBraverAttack(
  param: GenesisBraverBattle<BattleResult>,
): Animate {
  if (param.isDeath && param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.isDeath && param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.isDeath && param.result.name === "Guard") {
    const result: Guard = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "Guard") {
    const result: Guard = param.result;
    return guard({ ...param, result });
  }

  if (param.result.name === "Miss") {
    const result: Miss = param.result;
    return miss({ ...param, result });
  }

  if (param.result.name === "Feint") {
    const result: Feint = param.result;
    return feint({ ...param, result });
  }

  return empty();
}
