// @flow

import {Animate} from "../../../../../../animation/animate";
import type {AttackAnimationParam} from "./animation-param";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import type {
  BattleResult,
  CriticalHit, Feint,
  Guard, Miss,
  NormalHit
} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {overWriteAttackAnimResult} from "./animation-param";

/**
 * ネオランドーザの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function neoLandozerAttack(param: AttackAnimationParam<NeoLandozer, BattleResult>): Animate {
  const result = param.result;
  switch (result.name) {
    case 'NormalHit':
    case 'CriticalHit':
      return attack(overWriteAttackAnimResult(param, result));
    case 'Guard':
      return guard(overWriteAttackAnimResult(param, result));
    case 'Miss':
      return miss(overWriteAttackAnimResult(param, result));
    case 'Feint':
      return feint(overWriteAttackAnimResult(param, result));
    default:
      return empty();
  }
}

/** 通常ヒット、クリティカルヒット */
function attack(param: AttackAnimationParam<NeoLandozer, NormalHit | CriticalHit>): Animate {
  return all(
    param.attackerTD.sprite.armHammer(),
    delay(800).chain(
      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderTD.sprite.knockBack(),
      param.defenderTD.hitMark.spark.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
    )
  ).chain(
    param.defenderTD.sprite.knockBackToStand()
  );
}

/** ガード */
function guard(param: AttackAnimationParam<NeoLandozer, Guard>): Animate {
  return all(
    param.attackerTD.sprite.armHammer(),
    delay(800).chain(
      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderTD.sprite.guard(),
      param.defenderTD.hitMark.spark.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),

    )
  ).chain(
    param.defenderTD.sprite.guardToStand()
  );
}

/** ミス */
function miss(param: AttackAnimationParam<NeoLandozer, Miss>): Animate {
  return all(
    param.attackerTD.sprite.armHammer(),
    delay(800).chain(
      param.defenderTD.sprite.avoid()
    )
  );
}

/** フェイント */
function feint(param: AttackAnimationParam<NeoLandozer, Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderTD.sprite.avoid();
}