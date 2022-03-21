// @flow

import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {WingDozer} from "../../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {Animate} from "../../../../../../../animation/animate";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";
import {all} from "../../../../../../../animation/all";
import {dolly, toInitial, track} from "../../../td-camera";
import {TDCamera} from "../../../../../../../game-object/camera/td";

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
 * アタッカーにフォーカスを合わせる
 * attentionArmDozerよりもカメラ移動は控えめ
 *
 * @param camera カメラ
 * @param attacker アタッカーのスプライト
 * @return アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: WingDozer): Animate {
  const duration = 400;
  return all(
    track(camera, attacker.getObject3D().position.x * 0.6, duration),
    dolly(camera, '-20', duration)
  );
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
  return  all(
    param.attackerSprite.charge()
      .chain(delay(600)),
    focusToAttacker(param.tdCamera, param.attackerSprite)
  )
    .chain(param.attackerSprite.upper())
    .chain(all(
      delay(1800)
        .chain(param.attackerSprite.upperToStand())
        .chain(delay(500)),
      toInitial(param.tdCamera, 100),
      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderSprite.knockBack(),
      param.defenderTD.hitMark.shockWave.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
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
    .chain(delay(600))
    .chain(param.attackerSprite.upper())
    .chain(all(
      delay(1800)
        .chain(param.attackerSprite.upperToStand())
        .chain(delay(500)),
      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderSprite.guard(),
      param.defenderTD.hitMark.shockWave.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
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
    .chain(delay(600))
    .chain(param.attackerSprite.upper())
    .chain(all(
      delay(1800)
        .chain(param.attackerSprite.upperToStand())
        .chain(delay(500)),
      param.defenderSprite.avoid()
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
    .chain(delay(500));
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
  return all(
    param.attackerSprite.charge()
      .chain(delay(600)),
    focusToAttacker(param.tdCamera, param.attackerSprite)
  )
    .chain(param.attackerSprite.upper())
    .chain(all(
      delay(2300)
        .chain(param.attackerSprite.upperToStand())
        .chain(delay(1000)),
      param.attackerHUD.resultIndicator.slideIn()
        .chain(delay(500))
        .chain(param.attackerHUD.resultIndicator.moveToEdge()),
      toInitial(param.tdCamera, 100),
      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderSprite.down(),
      param.defenderTD.hitMark.shockWave.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
    ));
}