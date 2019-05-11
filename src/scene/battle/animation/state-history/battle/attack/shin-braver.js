// @flow

import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import type {AttackAnimationParam} from "./animation-param";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import type {
  BattleResult,
  CriticalHit,
  Guard,
  NormalHit
} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {overWriteAttackAnimResult} from "./animation-param";
import {all} from "../../../../../../animation/all";

/**
 * 新ブレイバーの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function shinBraverAttack(param: AttackAnimationParam<ShinBraver, BattleResult>): Animate {
  const result = param.result;
  if (result.name === 'NormalHit') {
    return attack(overWriteAttackAnimResult(param, result));
  } else if (result.name === 'Guard') {
    return guard(overWriteAttackAnimResult(param, result));
  } else if (result.name === 'Critical') {
    return attack(overWriteAttackAnimResult(param, result));
  }

  return empty();
}

/** 通常ヒット、クリティカル */
function attack(param: AttackAnimationParam<ShinBraver, NormalHit | CriticalHit>): Animate {
  return all(
    param.attackerTD.sprite.straightPunch(),
    delay(700).chain(
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
function guard(param: AttackAnimationParam<ShinBraver, Guard>): Animate {
  return all(
    param.attackerTD.sprite.straightPunch(),
    delay(700).chain(
      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderTD.sprite.guard(),
      param.defenderTD.hitMark.spark.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
    )
  ).chain(
    param.defenderTD.sprite.guardToStand()
  );
}