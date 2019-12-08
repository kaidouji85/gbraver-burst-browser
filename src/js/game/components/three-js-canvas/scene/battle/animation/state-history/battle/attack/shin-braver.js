// @flow

import {Animate} from "../../../../../../../../../animation/animate";
import {delay, empty} from "../../../../../../../../../animation/delay";
import type {BattleAnimationParam} from "../animation-param";
import {ShinBraver} from "../../../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {all} from "../../../../../../../../../animation/all";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {NormalHit} from "gbraver-burst-core/lib/effect/battle/result/normal-hit";
import type {CriticalHit} from "gbraver-burst-core/lib/effect/battle/result/critical-hit";
import type {Guard} from "gbraver-burst-core/lib/effect/battle/result/guard";
import type {Miss} from "gbraver-burst-core/lib/effect/battle/result/miss";
import type {Feint} from "gbraver-burst-core/lib/effect/battle/result/feint";

/**
 * 新ブレイバーの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function shinBraverAttack(param: BattleAnimationParam<ShinBraver, BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): BattleAnimationParam<ShinBraver, typeof castResult>);
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
function attack(param: BattleAnimationParam<ShinBraver, AttackResult>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.straightPunch())
      .chain(delay(1300))
      .chain(param.attackerTD.sprite.punchToStand()),

    delay(1000)
      .chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderTD.sprite.knockBack(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      ))
      .chain(delay(1300))
      .chain(param.defenderTD.sprite.knockBackToStand()),
  );
}

/**
 * ガード
 *
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: BattleAnimationParam<ShinBraver, Guard>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.straightPunch())
      .chain(delay(1300))
      .chain(param.attackerTD.sprite.punchToStand()),

    delay(1000)
      .chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderTD.sprite.guard(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp),
      ))
      .chain(delay(1300))
      .chain(param.defenderTD.sprite.guardToStand())
  );
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: BattleAnimationParam<ShinBraver, Miss>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.straightPunch())
      .chain(delay(500))
      .chain(param.attackerTD.sprite.punchToStand()),

    delay(1000)
      .chain(param.defenderTD.sprite.avoid())
      .chain(delay(1000))
      .chain(param.defenderTD.sprite.avoidToStand())
  );
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: BattleAnimationParam<ShinBraver, Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderTD.sprite.avoid()
    .chain(delay(500))
    .chain(param.defenderTD.sprite.avoidToStand());
}

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 *
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: BattleAnimationParam<ShinBraver, DownResult>): Animate {
  return all(
    param.attackerTD.sprite.charge()
      .chain(delay(600))
      .chain(param.attackerTD.sprite.straightPunch())
      .chain(delay(1300))
      .chain(param.attackerTD.sprite.punchToStand()),

    delay(1000)
      .chain(all(
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderTD.sprite.down(),
        param.defenderTD.hitMark.spark.popUp(),
        param.defenderTD.gauge.hp(param.defenderState.armdozer.hp)
      ))
  );
}