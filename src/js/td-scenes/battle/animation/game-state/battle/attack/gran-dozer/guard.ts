import { Guard } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { GranDozerBattle } from "./gran-dozer-battle";
import { focusToAttacker } from "./focus-to-attacker";
import { toInitial } from "../../../../td-camera";

/**
 * ガード
 * @param param パラメータ
 * @returns アニメーション
 */
export function guard(param: GranDozerBattle<Guard>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  ).chain(
    all(
      param.attackerSprite
        .tackle()
        .chain(delay(1000))
        .chain(param.attackerSprite.tackleToStand())
        .chain(delay(500)),
    ),
    delay(100).chain(
      all(
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    ),
  );
}
