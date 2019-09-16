// @flow

import {Animate} from "../../../../../../animation/animate";
import type {BattleAnimationParam} from "../animation-param";
import {overWriteResult} from "../animation-param";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {NormalHit} from "gbraver-burst-core/lib/effect/battle/result/normal-hit";
import type {CriticalHit} from "gbraver-burst-core/lib/effect/battle/result/critical-hit";
import type {Guard} from "gbraver-burst-core/lib/effect/battle/result/guard";
import type {Miss} from "gbraver-burst-core/lib/effect/battle/result/miss";
import type {Feint} from "gbraver-burst-core/lib/effect/battle/result/feint";

/**
 * ネオランドーザの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function neoLandozerAttack(param: BattleAnimationParam<NeoLandozer, BattleResult>): Animate {
  if ((param.result.name === 'NormalHit') || (param.result.name === 'CriticalHit') || (param.result.name === 'Guard') && param.isDeath) {
    return down(overWriteResult(param, param.result));
  } else if ((param.result.name === 'NormalHit') || (param.result.name === 'CriticalHit')) {
    return attack(overWriteResult(param, param.result));
  } else if (param.result.name === 'Guard') {
    return guard(overWriteResult(param, param.result));
  } else if (param.result.name === 'Miss') {
    return miss(overWriteResult(param, param.result));
  } else if (param.result.name === 'Feint') {
    return feint(overWriteResult(param, param.result));
  } else {
    return empty();
  }
}

/** 通常ヒット、クリティカルヒット */
function attack(param: BattleAnimationParam<NeoLandozer, NormalHit | CriticalHit>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.armHammer())
      .chain(delay(1300))
      .chain(param.attackerTD.sprite.hmToStand()),

    delay(1000)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderTD.sprite.knockBack(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
      .chain(delay(1300))
      .chain(param.defenderTD.sprite.knockBackToStand()),
  );
}

/** ガード */
function guard(param: BattleAnimationParam<NeoLandozer, Guard>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.armHammer())
      .chain(delay(1300))
      .chain(param.attackerTD.sprite.hmToStand()),

    delay(1000)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderTD.sprite.guard(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
      .chain(delay(1300))
      .chain(param.defenderTD.sprite.guardToStand()),
  );
}

/** ミス */
function miss(param: BattleAnimationParam<NeoLandozer, Miss>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.armHammer())
      .chain(delay(500))
      .chain(param.attackerTD.sprite.hmToStand()),

    delay(1000)
      .chain(param.defenderTD.sprite.avoid())
      .chain(delay(1300))
      .chain(param.defenderTD.sprite.avoidToStand()),
  );
}

/** フェイント */
function feint(param: BattleAnimationParam<NeoLandozer, Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderTD.sprite.avoid()
    .chain(delay(500))
    .chain(param.defenderTD.sprite.avoidToStand())
}

/** とどめ */
function down(param: BattleAnimationParam<NeoLandozer, NormalHit | Guard | CriticalHit>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.armHammer())
      .chain(delay(1300))
      .chain(param.attackerTD.sprite.hmToStand()),

    delay(1000)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderTD.sprite.down(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
  );
}