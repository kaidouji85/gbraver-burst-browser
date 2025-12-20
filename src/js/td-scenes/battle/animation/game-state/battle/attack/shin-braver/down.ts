import { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { onStart } from "../../../../../../../animation/on-start";
import { play, stop } from "../../../../../../../bgm/bgm-operators";
import { toInitial } from "../../../../td-camera";
import { focusToAttacker } from "./focus-to-attacker";
import { ShinBraverBattle } from "./shin-braver-battle";

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 * @param param パラメータ
 * @returns アニメーション
 */
export function down(param: ShinBraverBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        onStart(() => param.bgm.do(stop))
          .chain(delay(100))
          .chain(onStart(() => param.bgm.do(play(param.battleEndBGM)))),
        delay(1500)
          .chain(param.attackerSprite.punchToStand())
          .chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        delay(700)
          .chain(all(
            onStart(() => param.se.play(param.bigExplosion)),
            all(
              param.tdCamera.move({ y: "-20" }, 200),
              param.tdCamera.lookAt({ y: "-20" }, 200)
            ).chain(all(
              param.tdCamera.move({ y: "+10" }, 300),
              param.tdCamera.lookAt({ y: "+10" }, 300)
            )))),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ));
}
