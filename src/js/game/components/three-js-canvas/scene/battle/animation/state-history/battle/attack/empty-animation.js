// @flow

import {Animate} from "../../../../../../../../../animation/animate";
import type {BattleAnimationParam} from "../animation-param";
import type {ArmDozerSprite} from "../../../../../../../../../game-object/armdozer/armdozer-sprite";
import {empty} from "../../../../../../../../../animation/delay";
import {all} from "../../../../../../../../../animation/all";
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
  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParam<ArmDozerSprite, ViewDamageResult | (typeof castResult)>);
    return viewDamage(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParam<ArmDozerSprite, ViewDamageResult | (typeof castResult)>);
    return viewDamage(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParam<ArmDozerSprite, ViewDamageResult | (typeof castResult)>);
    return viewDamage(castParam);
  }

  return empty();
}

/** viewDamageが受け取ることができる戦闘結果 */
type ViewDamageResult = NormalHit | CriticalHit | Guard;

/**
 * ダメージ数字だけを表示する
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
function viewDamage(param: BattleAnimationParam<ArmDozerSprite, ViewDamageResult>): Animate {
  return all(
    param.defenderTD.damageIndicator.popUp(param.result.damage),
    param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
  );
}
