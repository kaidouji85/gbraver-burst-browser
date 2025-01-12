import { Miss } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { NeoLandozerBattle } from "./neo-landozer-battle";

/**
 * ミス
 * @param param パラメータ
 * @returns アニメーション
 */
export function miss(param: NeoLandozerBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.armHammer())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.hmToStand())
    .chain(delay(500));
}
