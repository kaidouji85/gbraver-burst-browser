import { Guard } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/object-animation/all";
import { Animate } from "../../../../../../../animation/object-animation/animate";
import { delay } from "../../../../../../../animation/object-animation/delay";
import { WingDozerBattle } from "./wing-dozer-battle";

/**
 * ウィングドーザ 攻撃ガード
 * @param param パラメータ
 * @returns アニメーション
 */
export function guard(param: WingDozerBattle<Guard>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(600))
    .chain(param.attackerSprite.upper())
    .chain(
      all(
        delay(1000)
          .chain(param.attackerSprite.upperToStand())
          .chain(delay(500)),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}
