// @flow

import {Animate} from "../../../../../../../animation/animate";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {all} from "../../../../../../../animation/all";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";

/**
 * シンブレイバー 戦闘アニメーション パラメータ
 *
 * @type RESULT 戦闘結果
 */
export type ShinBraverBattleAnimationParam<RESULT> = BattleAnimationParamX<ShinBraver, RESULT>;

/**
 * シンブレイバー戦闘アニメーションパラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param param 変換元
 * @return 変換結果
 */
export function toShinBraverBattleAnimationParam(param: BattleAnimationParam): ?ShinBraverBattleAnimationParam<BattleResult> {
  if (param.attackerSprite instanceof ShinBraver) {
    const sprite: ShinBraver = param.attackerSprite;
    return ((param: any): BattleAnimationParamX<typeof sprite, typeof param.result>);
  }
  return null;
}

/**
 * 新ブレイバーの攻撃アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function shinBraverAttack(param: ShinBraverBattleAnimationParam<BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): ShinBraverBattleAnimationParam<typeof castResult>);
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
function attack(param: ShinBraverBattleAnimationParam<AttackResult>): Animate {
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
function guard(param: ShinBraverBattleAnimationParam<Guard>): Animate {
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
function miss(param: ShinBraverBattleAnimationParam<Miss>): Animate {
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
function feint(param: ShinBraverBattleAnimationParam<Feint>): Animate {
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
function down(param: ShinBraverBattleAnimationParam<DownResult>): Animate {
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
    .chain(delay(500));
}