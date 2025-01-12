import { Miss } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { GranDozerBattle } from "./gran-dozer-battle";

/**
 * ミス
 * @param param パラメータ
 * @returns アニメーション
 */
export function miss(param: GranDozerBattle<Miss>): Animate {
  return param.attackerSprite
    .armHammerCharge()
    .chain(delay(500))
    .chain(param.attackerSprite.armHammerAttack())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.hmToStand())
    .chain(delay(500));
}
