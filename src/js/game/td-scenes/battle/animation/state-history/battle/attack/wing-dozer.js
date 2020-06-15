// @flow

import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {WingDozer} from "../../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {Animate} from "../../../../../../../animation/animate";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleResult, CriticalHit, NormalHit, Guard, Miss, Feint} from "gbraver-burst-core";
import {all} from "../../../../../../../animation/all";

/**
 * ウィングドーザ 戦闘アニメーション パラメータ
 *
 * @type Result 戦闘結果
 */
export type WingDozerBattle<Result> = BattleAnimationParamX<WingDozer, Result>;

/**
 * ウィングドーザ 戦闘アニメーション パラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param origin 変換前
 * @return 変換結果
 */
export function castWingDozerBattle(origin: BattleAnimationParam): ?WingDozerBattle<BattleResult> {
  if (origin.attackerSprite instanceof WingDozer) {
    const sprite: WingDozer = origin.attackerSprite;
    return ((origin: any): BattleAnimationParamX<typeof sprite, typeof origin.result>);
  }
  return null;
}

/**
 * ウィングドーザ 戦闘アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function wingDozerAttack(param: WingDozerBattle<BattleResult>): Animate {
  if (param.result.name === 'NormalHit' && param.isDeath) {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): WingDozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): WingDozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'CriticalHit' && param.isDeath) {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): WingDozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): WingDozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'Guard' && param.isDeath) {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): WingDozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): WingDozerBattle<typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): WingDozerBattle<typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): WingDozerBattle<typeof castResult>);
    return feint(castParam);
  }

  return empty();
}

/**
 * attackが受け取れる戦闘結果
 */
type AttackResult = NormalHit | CriticalHit;

/**
 * ウィングドーザ 攻撃ヒット
 *
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: WingDozerBattle<AttackResult>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(800))
    .chain(all(
      param.attackerSprite.upper()
        .chain(delay(2000))
        .chain(param.attackerSprite.upperToStand()),

      delay(100)
        .chain(all(
          param.defenderTD.damageIndicator.popUp(param.result.damage),
          param.defenderSprite.knockBack(),
          param.defenderTD.hitMark.shockWave.popUp(),
          param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
        ))
    ));
}

/**
 * ウィングドーザ 攻撃ガード
 *
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: WingDozerBattle<Guard>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(800))
    .chain(all(
      param.attackerSprite.upper()
        .chain(delay(2000))
        .chain(param.attackerSprite.upperToStand()),

      delay(100)
        .chain(all(
          param.defenderTD.damageIndicator.popUp(param.result.damage),
          param.defenderSprite.guard(),
          param.defenderTD.hitMark.shockWave.popUp(),
          param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
        ))
    ));
}

/**
 * ウィングドーザ 攻撃ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: WingDozerBattle<Miss>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(800))
    .chain(all(
      param.attackerSprite.upper()
        .chain(delay(2000))
        .chain(param.attackerSprite.upperToStand()),

      delay(100)
        .chain(param.defenderSprite.avoid())
    ));
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: WingDozerBattle<Feint>): Animate {
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
function down(param: WingDozerBattle<DownResult>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(800))
    .chain(all(
      param.attackerSprite.upper(),

      delay(100)
        .chain(all(
          param.defenderTD.damageIndicator.popUp(param.result.damage),
          param.defenderSprite.down(),
          param.defenderTD.hitMark.shockWave.popUp(),
          param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
        ))
    ))
    .chain(delay(1000))
    .chain(param.attackerSprite.upperToStand());
}