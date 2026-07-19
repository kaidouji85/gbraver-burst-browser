import { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { onStart } from "../../../../../../../animation/on-start";
import { stop } from "../../../../../../../bgm/bgm-operators";
import { shakeY, toInitial } from "../../../../td-camera";
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
        param.tdObjects.skyBrightness.brightness(0.3, 100),
        param.tdObjects.illumination.intensity(0.3, 100),
        delay(2100).chain(param.attackerSprite.hmToStand()).chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        onStart(() => param.bgm.do(stop)),
        all(param.defenderSprite.knockBack(), delay(800)).chain(
          all(
            param.defenderSprite.down(),
            param.tdObjects.skyBrightness.brightness(1, 500),
            param.tdObjects.illumination.intensity(1, 500),
            delay(param.defenderSprite.downImpactDelay).chain(
              all(
                onStart(() => param.se.play(param.bigExplosion)),
                shakeY(param.tdCamera),
              ),
            ),
          ),
        ),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}
