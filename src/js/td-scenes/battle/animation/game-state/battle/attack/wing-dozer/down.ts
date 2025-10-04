import { CriticalHit, Guard, NormalHit } from "gbraver-burst-core";

import { all } from "../../../../../../../animation/all";
import { Animate } from "../../../../../../../animation/animate";
import { delay } from "../../../../../../../animation/delay";
import { onStart } from "../../../../../../../animation/on-start";
import { play, stop } from "../../../../../../../bgm/bgm-operators";
import { toInitial } from "../../../../td-camera";
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
        onStart(() => {
          param.bgm.do(stop);
        }),
        delay(1500)
          .chain(param.attackerSprite.upperToStand())
          .chain(delay(500)),
        param.attackerHUD.resultIndicator
          .slideIn()
          .chain(delay(500))
          .chain(param.attackerHUD.resultIndicator.moveToEdge()),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down().chain(
          onStart(() => {
            param.bgm.do(play(param.battleEndBGM));
          }),
        ),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}
