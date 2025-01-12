import { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { toInitial } from "../../../../td-camera";
import { focusToAttacker } from "./focus-to-attacker";
import { LightningDozerBattle } from "./lightning-dozer-battle";

/** ダウンが受け取れる戦闘結果 */
type DownResult = NormalHit | Guard | CriticalHit;

/**
 * とどめ
 * @param param パラメータ
 * @returns アニメーション
 */
export function down(param: LightningDozerBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.armHammer())
    .chain(
      all(
        delay(1500).chain(param.attackerSprite.hmToStand()).chain(delay(500)),
        param.attackerHUD.resultIndicator
          .slideIn()
          .chain(delay(500))
          .chain(param.attackerHUD.resultIndicator.moveToEdge()),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}
