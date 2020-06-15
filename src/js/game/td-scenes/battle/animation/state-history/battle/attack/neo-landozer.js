// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {NeoLandozer} from "../../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {delay, empty} from "../../../../../../../animation/delay";
import {all} from "../../../../../../../animation/all";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";

/**
 * ネオランドーザ 戦闘アニメーション パラメータ
 */
export type NeoLandozerBattle<RESULT> =BattleAnimationParamX<NeoLandozer, RESULT>;

/**
 * ネオランドーザ戦闘アニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param param キャスト元
 * @return キャスト結果
 */
export function castNeoLandozerBattle(param: BattleAnimationParam): ?NeoLandozerBattle<BattleResult> {
  if (param.attackerSprite instanceof NeoLandozer) {
    const sprite: NeoLandozer = param.attackerSprite;
    return ((param: any): BattleAnimationParamX<typeof sprite, typeof param.result>);
  }
  return null;
}

/**
 * ネオランドーザの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function neoLandozerAttack(param: NeoLandozerBattle<BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): NeoLandozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): NeoLandozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): NeoLandozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): NeoLandozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): NeoLandozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): NeoLandozerBattle<typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): NeoLandozerBattle<typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): NeoLandozerBattle<typeof castResult>);
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
function attack(param: NeoLandozerBattle<AttackResult>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(600))
    .chain(all(
      param.attackerSprite.armHammer(),

      delay(200).chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      ))
    ))
    .chain(delay(1000))
    .chain(param.attackerSprite.hmToStand());
}

/**
 * ガード
 *
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: NeoLandozerBattle<Guard>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(600))
    .chain(all(
      param.attackerSprite.armHammer(),

      delay(200).chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      ))
    ))
    .chain(delay(1000))
    .chain(param.attackerSprite.hmToStand());
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: NeoLandozerBattle<Miss>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(600))
    .chain(all(
      param.attackerSprite.armHammer(),

      delay(200)
        .chain(param.defenderSprite.avoid())
    ))
    .chain(delay(1000))
    .chain(param.attackerSprite.hmToStand());
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: NeoLandozerBattle<Feint>): Animate {
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
function down(param: NeoLandozerBattle<DownResult>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(600))
    .chain(all(
      param.attackerSprite.armHammer(),

      delay(200).chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      ))
    ))
    .chain(delay(1000))
    .chain(param.attackerSprite.hmToStand());
}