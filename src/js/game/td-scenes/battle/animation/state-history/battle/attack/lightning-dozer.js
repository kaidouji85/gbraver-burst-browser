// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {LightningDozer} from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";
import {all} from "../../../../../../../animation/all";

/**
 * ライトニングドーザ 戦闘アニメーション パラメータ
 *
 * @type RESULT 戦闘結果
 */
export type LightningDozerBattleAnimationParam<RESULT> = BattleAnimationParamX<LightningDozer, RESULT>

/**
 * ライトニングドーザ戦闘アニメーションパラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param param 変換元
 * @return 変換結果
 */
export function toLightningDozerBattleAnimationParam(param: BattleAnimationParam): ?LightningDozerBattleAnimationParam<BattleResult> {
  if (param.attackerSprite instanceof LightningDozer) {
    const sprite: LightningDozer = param.attackerSprite;
    return ((param: any): BattleAnimationParamX<typeof sprite, typeof param.result>);
  }

  return null;
}

/**
 * ライトニングドーザ 戦闘アニメーション
 *
 * @param param パラメーター
 * @return アニメーション
 */
export function lightningDozerAttack(param: LightningDozerBattleAnimationParam<BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<Guard | typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<Miss | typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): LightningDozerBattleAnimationParam<Feint | typeof castResult>);
    return feint(castParam);
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
function attack(param: LightningDozerBattleAnimationParam<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(2000))
      .chain(param.attackerSprite.hmToStand()),

    delay(800)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
  );
}

/**
 * ガード
 *
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: LightningDozerBattleAnimationParam<Guard>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(2000))
      .chain(param.attackerSprite.hmToStand()),

    delay(800)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
  );
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: LightningDozerBattleAnimationParam<Miss>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(1000))
      .chain(param.attackerSprite.hmToStand()),

    delay(800)
      .chain(param.defenderSprite.avoid())
  );
}

/** ダウンが受け取れる戦闘結果 */
type DownResult = NormalHit | Guard | CriticalHit;

/**
 * とどめ
 *
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: LightningDozerBattleAnimationParam<DownResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500))
      .chain(param.attackerSprite.armHammer()),

    delay(800)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
  ).chain(delay(1000)
  ).chain(param.attackerSprite.hmToStand());
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: LightningDozerBattleAnimationParam<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid()
    .chain(delay(500))
    .chain(param.defenderSprite.avoidToStand())
}