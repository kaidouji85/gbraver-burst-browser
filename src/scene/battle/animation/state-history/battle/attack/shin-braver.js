// @flow

import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import type {BattleAnimationParam} from "../animation-param";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import type {
  BattleResult,
  CriticalHit, Feint,
  Guard, Miss,
  NormalHit
} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {overWriteResult} from "../animation-param";
import {all} from "../../../../../../animation/all";

/**
 * 新ブレイバーの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function shinBraverAttack(param: BattleAnimationParam<ShinBraver, BattleResult>): Animate {
  const result = param.result;
  switch (result.name) {
    case 'NormalHit':
    case 'Critical':
      return attack(overWriteResult(param, result));
    case 'Guard':
      return guard(overWriteResult(param, result));
    case 'Miss':
      return miss(overWriteResult(param, result));
    case 'Feint':
      return feint(overWriteResult(param, result));
    default:
      return empty();
  }
}

/** 通常ヒット、クリティカル */
function attack(param: BattleAnimationParam<ShinBraver, NormalHit | CriticalHit>): Animate {
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
function guard(param: BattleAnimationParam<ShinBraver, Guard>): Animate {
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

/** ミス */
function miss(param: BattleAnimationParam<ShinBraver, Miss>): Animate {
  return all(
    param.attackerTD.sprite.straightPunch(),
    delay(700).chain(
      param.defenderTD.sprite.avoid()
    )
  ).chain(
   delay(500)
  ).chain(
    param.defenderTD.sprite.avoidToStand()
  );
}

/** フェイント */
function feint(param: BattleAnimationParam<ShinBraver, Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderTD.sprite
    .avoid()
    .chain(delay(500))
    .chain(param.defenderTD.sprite.avoidToStand())
}