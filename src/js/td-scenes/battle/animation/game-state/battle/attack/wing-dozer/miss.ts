import { Miss } from "gbraver-burst-core";

import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { WingDozerBattle } from "./wing-dozer-battle";

/**
 * ウィングドーザ 攻撃ミス
 * @param param パラメータ
 * @returns アニメーション
 */
export function miss(param: WingDozerBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(600))
    .chain(param.attackerSprite.upper())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.upperToStand())
    .chain(delay(500));
}
