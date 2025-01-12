import { BattleResult } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { empty } from "../../../../../../../animation/delay";
import { attack } from "./attack";
import { down } from "./down";
import { feint } from "./feint";
import { guard } from "./guard";
import { LightningDozerBattle } from "./lightning-dozer-battle";
import { miss } from "./miss";

/**
 * ライトニングドーザ 戦闘アニメーション
 * @param param パラメーター
 * @returns アニメーション
 */
export function lightningDozerAttack(
  param: LightningDozerBattle<BattleResult>,
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
