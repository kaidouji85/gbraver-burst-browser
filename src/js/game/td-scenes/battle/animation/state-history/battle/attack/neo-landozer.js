// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParamX} from "../animation-param";
import {NeoLandozer} from "../../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {delay, empty} from "../../../../../../../animation/delay";
import {all} from "../../../../../../../animation/all";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";

/**
 * ネオランドーザの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function neoLandozerAttack(param: BattleAnimationParamX<NeoLandozer, BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): BattleAnimationParamX<NeoLandozer, typeof castResult>);
    return feint(castParam);
  }

  return empty();
}

/** attackが受け取ることができる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒット
 *
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: BattleAnimationParamX<NeoLandozer, AttackResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(1300))
      .chain(param.attackerSprite.hmToStand()),

    delay(1000)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      )
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
function guard(param: BattleAnimationParamX<NeoLandozer, Guard>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(1300))
      .chain(param.attackerSprite.hmToStand()),

    delay(1000)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      )
      .chain(delay(1300))
      .chain(param.defenderSprite.guardToStand()),
  );
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: BattleAnimationParamX<NeoLandozer, Miss>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(500))
      .chain(param.attackerSprite.hmToStand()),

    delay(1000)
      .chain(param.defenderSprite.avoid())
      .chain(delay(1300))
      .chain(param.defenderSprite.avoidToStand()),
  );
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: BattleAnimationParamX<NeoLandozer, Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid()
    .chain(delay(500))
    .chain(param.defenderSprite.avoidToStand())
}

/** downが受け取ることができる戦闘結果 */
type DownResult = NormalHit | Guard | CriticalHit;

/**
 * とどめ
 *
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: BattleAnimationParamX<NeoLandozer, DownResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(600))
      .chain(param.attackerSprite.armHammer()),

    delay(1000)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      )
  ).chain(delay(1000))
    .chain(param.attackerSprite.hmToStand())
    .chain(delay(1000))
    .chain(param.attackerSprite.turnStart())
    .chain(delay(500));
}