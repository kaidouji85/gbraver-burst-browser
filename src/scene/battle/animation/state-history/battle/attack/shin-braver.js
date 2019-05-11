// @flow

import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import type {AttackAnimationParam} from "./animation-param";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import type {BattleResult, CriticalHit, NormalHit} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {overWriteAttackAnimResult} from "./animation-param";

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
  }

  return empty();
}

function attack(param: AttackAnimationParam<ShinBraver, NormalHit | CriticalHit>): Animate {
  console.log('attack');
  return empty();
}