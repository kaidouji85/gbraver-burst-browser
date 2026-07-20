import { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { onStart } from "../../../../../../../animation/on-start";
import { stop } from "../../../../../../../bgm/bgm-operators";
import { shakeY, toInitial } from "../../../../td-camera";
import { focusToAttacker } from "./focus-to-attacker";
import { WingDozerBattle } from "./wing-dozer-battle";

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 * @param param パラメータ
 * @returns アニメーション
 */
export function down(param: WingDozerBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(600)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.upper())
    .chain(
      all(
        param.tdObjects.skyBrightness.brightness(0.3, 100),
        param.tdObjects.illumination.intensity(0.3, 100),
        delay(1900)
          .chain(param.attackerSprite.upperToStand())
          .chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        onStart(() => param.bgm.do(stop)),
        all(param.defenderSprite.knockBack(), delay(600)).chain(
          all(
            param.defenderSprite.down(),
            param.tdObjects.skyBrightness.brightness(1, 100),
            param.tdObjects.illumination.intensity(1, 100),
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
