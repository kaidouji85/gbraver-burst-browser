// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParamX} from "../animation-param";
import {LightningDozer} from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleResult, CriticalHit, NormalHit} from "gbraver-burst-core";
import {all} from "../../../../../../../animation/all";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";

/**
 * ライトニングドーザ 戦闘アニメーション
 *
 * @param param パラメーター
 * @return アニメーション
 */
export function lightningDozerAttack(param: BattleAnimationParamX<LightningDozer, BattleResult>): Animate {
  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParamX<LightningDozer, AttackResult | typeof castResult>);
    return attack(castParam);
  }

  return empty();
}

/**
 * 攻撃ヒットアニメが受け取れる戦闘結果
 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒットアニメ
 *
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: BattleAnimationParamX<LightningDozer, AttackResult>): Animate {
  return all(
    delay(0)
      .chain(param.attackerSprite.tackle())
      .chain(delay(1300))
      .chain(param.attackerSprite.tackleToStand()),

    delay(200)
      .chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      ))
      .chain(delay(1300))
      .chain(param.defenderSprite.knockBackToStand()),
  );
}