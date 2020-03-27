// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParamX} from "../animation-param";
import {LightningDozer} from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleResult, CriticalHit, NormalHit} from "gbraver-burst-core";
import {all} from "../../../../../../../animation/all";
import type {Guard} from "gbraver-burst-core/lib/effect/battle/result/guard";
import type {Miss} from "gbraver-burst-core/lib/effect/battle/result/miss";
import type {Feint} from "gbraver-burst-core/lib/effect/battle/result/feint";

/**
 * ライトニングドーザ 戦闘アニメーション パラメータ
 *
 * @type RESULT 戦闘結果
 */
type LightningDozerBattleParam<RESULT> = BattleAnimationParamX<LightningDozer, RESULT>

/**
 * ライトニングドーザ 戦闘アニメーション
 *
 * @param param パラメーター
 * @return アニメーション
 */
export function lightningDozerAttack(param: LightningDozerBattleParam<BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): LightningDozerBattleParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): LightningDozerBattleParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): LightningDozerBattleParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): LightningDozerBattleParam<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): LightningDozerBattleParam<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): LightningDozerBattleParam<Guard | typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): LightningDozerBattleParam<Miss | typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): LightningDozerBattleParam<Feint | typeof castResult>);
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
function attack(param: LightningDozerBattleParam<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(800))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(2000))
      .chain(param.attackerSprite.hmToStand()),

    delay(1200)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      ).chain(delay(2500))
      .chain(param.defenderSprite.knockBackToStand()),
  );
}

/**
 * ガード
 *
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: LightningDozerBattleParam<Guard>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(800))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(2000))
      .chain(param.attackerSprite.hmToStand()),

    delay(1200)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      ).chain(delay(2500))
      .chain(param.defenderSprite.guardToStand()),
  );
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: LightningDozerBattleParam<Miss>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(800))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(1000))
      .chain(param.attackerSprite.hmToStand()),

    delay(1200)
      .chain(param.defenderSprite.avoid())
      .chain(delay(2000))
      .chain(param.defenderSprite.avoidToStand()),
  );
}

/** ダウンが受け取れる戦闘結果 */
type DownResult = NormalHit | Guard | CriticalHit;

/**
 * ダウン
 *
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: LightningDozerBattleParam<DownResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(800))
      .chain(param.attackerSprite.armHammer())
      .chain(delay(2000))
      .chain(param.attackerSprite.hmToStand()),

    delay(1200)
      .chain(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      ).chain(delay(500))
  );
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: LightningDozerBattleParam<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid()
    .chain(delay(500))
    .chain(param.defenderSprite.avoidToStand());
}