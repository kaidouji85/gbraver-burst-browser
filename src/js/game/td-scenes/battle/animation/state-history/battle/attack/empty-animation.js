// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import type {ArmDozerSprite} from "../../../../../../../game-object/armdozer/armdozer-sprite";
import {empty} from "../../../../../../../animation/delay";
import {all} from "../../../../../../../animation/all";
import type {CriticalHit, Guard, NormalHit} from "gbraver-burst-core";

/**
 * 数字表示だけをする戦闘アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function emptyAttackAnimation(param: BattleAnimationParam): Animate {
  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParamX<ArmDozerSprite, ViewDamageResult | (typeof castResult)>);
    return viewDamage(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParamX<ArmDozerSprite, ViewDamageResult | (typeof castResult)>);
    return viewDamage(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParamX<ArmDozerSprite, ViewDamageResult | (typeof castResult)>);
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
function viewDamage(param: BattleAnimationParamX<ArmDozerSprite, ViewDamageResult>): Animate {
  return all(
    param.defenderTD.damageIndicator.popUp(param.result.damage),
    param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
  );
}
