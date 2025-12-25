import { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { onStart } from "../../../../../../../animation/on-start";
import { stop } from "../../../../../../../bgm/bgm-operators";
import { shakeY, toInitial } from "../../../../td-camera";
import { focusToAttacker } from "./focus-to-attacker";
import { GenesisBraverBattle } from "./genesis-braver-battle";

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 * @param param パラメータ
 * @returns アニメーション
 */
export function down(param: GenesisBraverBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1800).chain(param.attackerSprite.spToStand()).chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        delay(param.defenderSprite.downImpactDelay).chain(
          all(
            onStart(() => param.bgm.do(stop)),
            onStart(() => param.se.play(param.bigExplosion)),
            shakeY(param.tdCamera),
          ),
        ),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}
