// @flow

import {Animate} from "../../../../../../../animation/animate";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleAnimationParamX} from "../animation-param";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {all} from "../../../../../../../animation/all";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";

/**
 * 新ブレイバーの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function shinBraverAttack(param: BattleAnimationParamX<ShinBraver, BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): BattleAnimationParamX<ShinBraver, typeof castResult>);
    return feint(castParam);
  }

  return empty();
}

/** attackが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒット
 *
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: BattleAnimationParamX<ShinBraver, AttackResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.straightPunch())
      .chain(delay(1300))
      .chain(param.attackerSprite.punchToStand()),

    delay(1000)
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

/**
 * ガード
 *
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: BattleAnimationParamX<ShinBraver, Guard>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.straightPunch())
      .chain(delay(1300))
      .chain(param.attackerSprite.punchToStand()),

    delay(1000)
      .chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp),
      ))
      .chain(delay(1300))
      .chain(param.defenderSprite.guardToStand())
  );
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: BattleAnimationParamX<ShinBraver, Miss>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.straightPunch())
      .chain(delay(500))
      .chain(param.attackerSprite.punchToStand()),

    delay(1000)
      .chain(param.defenderSprite.avoid())
      .chain(delay(1000))
      .chain(param.defenderSprite.avoidToStand())
  );
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: BattleAnimationParamX<ShinBraver, Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid()
    .chain(delay(500))
    .chain(param.defenderSprite.avoidToStand());
}

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 *
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: BattleAnimationParamX<ShinBraver, DownResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.straightPunch()),

    delay(1000)
      .chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      ))
  ).chain(delay(1000))
    .chain(param.attackerSprite.punchToStand())
    .chain(delay(1000))
    .chain(param.attackerSprite.turnStart())
    .chain(delay(500));
}