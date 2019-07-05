// @flow

import {Animate} from "../../../../../../animation/animate";
import type {BattleAnimationParam} from "../animation-param";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {overWriteResult} from "../animation-param";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {NormalHit} from "gbraver-burst-core/lib/effect/battle/result/normal-hit";
import type {CriticalHit} from "gbraver-burst-core/lib/effect/battle/result/critical-hit";
import type {Guard} from "gbraver-burst-core/lib/effect/battle/result/guard";

/**
 * 数字表示だけをする戦闘アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function emptyAttackAnimation(param: BattleAnimationParam<ArmDozerSprite, BattleResult>): Animate {
  const result = param.result;
  switch (result.name) {
    case 'NormalHit':
    case 'CriticalHit':
    case 'Guard':
      return viewDamage(overWriteResult(param, result));
    default:
      return empty();
  }
}

/** 通常ヒット、クリティカルヒット、ガード */
function viewDamage(param: BattleAnimationParam<ArmDozerSprite, NormalHit | CriticalHit | Guard>): Animate {
  return all(
    param.defenderTD.damageIndicator.popUp(param.result.damage),
    param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
  );
}
