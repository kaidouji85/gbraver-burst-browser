import { Guard } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { GranDozerBattle } from "./gran-dozer-battle";

/**
 * ガード
 * @param param パラメータ
 * @returns アニメーション
 */
export function guard(param: GranDozerBattle<Guard>): Animate {
  return param.attackerSprite
    .armHammerCharge()
    .chain(delay(500))
    .chain(param.attackerSprite.armHammerAttack())
    .chain(
      all(
        delay(1000).chain(param.attackerSprite.hmToStand()).chain(delay(500)),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}
