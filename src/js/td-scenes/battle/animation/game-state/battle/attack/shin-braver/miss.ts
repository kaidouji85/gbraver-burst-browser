import { Miss } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { ShinBraverBattle } from "./shin-braver-battle";

/**
 * ミス
 * @param param パラメータ
 * @returns アニメーション
 */
export function miss(param: ShinBraverBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.punchToStand())
    .chain(delay(500));
}
