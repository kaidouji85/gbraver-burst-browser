import { BattleResult } from "gbraver-burst-core";

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
  const { result } = param;
  switch (result.name) {
    case "NormalHit":
    case "CriticalHit":
      return param.isDeath
        ? down({ ...param, result })
        : attack({ ...param, result });
    case "Guard":
      return param.isDeath
        ? down({ ...param, result })
        : guard({ ...param, result });
    case "Miss":
      return miss({ ...param, result });
    case "Feint":
      return feint({ ...param, result });
    default:
      return empty();
  }
}
