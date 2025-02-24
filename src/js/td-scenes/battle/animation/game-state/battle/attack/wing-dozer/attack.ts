import { CriticalHit, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { toInitial } from "../../../../td-camera";
import { focusToAttacker } from "./focus-to-attacker";
import { WingDozerBattle } from "./wing-dozer-battle";

/** attackが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * ウィングドーザ 攻撃ヒット
 * @param param パラメータ
 * @returns アニメーション
 */
export function attack(param: WingDozerBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(600)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.upper())
    .chain(
      all(
        delay(1000)
          .chain(param.attackerSprite.upperToStand())
          .chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}
