// @flow

import {Animate} from "../../../../../../../animation/animate";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {all} from "../../../../../../../animation/all";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";
import {dolly, toInitial, track} from "../../../td-camera";
import {TDCamera} from "../../../../../../../game-object/camera/td";

/**
 * シンブレイバー 戦闘アニメーション パラメータ
 *
 * @template RESULT 戦闘結果
 */
export type ShinBraverBattle<RESULT> = BattleAnimationParamX<ShinBraver, RESULT>;

/**
 * シンブレイバー戦闘アニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param param キャスト元
 * @return キャスト結果
 */
export function castShinBraverBattle(param: BattleAnimationParam): ?ShinBraverBattle<BattleResult> {
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
export function shinBraverAttack(param: ShinBraverBattle<BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): ShinBraverBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): ShinBraverBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): ShinBraverBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): ShinBraverBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): ShinBraverBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): ShinBraverBattle<typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): ShinBraverBattle<typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): ShinBraverBattle<typeof castResult>);
    return feint(castParam);
  }

  return empty();
}

/**
 * アタッカーにフォーカスを合わせる
 *
 * @param camera カメラ
 * @param attacker スプライト
 * @return アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: ShinBraver): Animate {
  const duration = 400;
  return all(
    track(camera, attacker.getObject3D().position.x * 0.4, duration),
    dolly(camera, '-30', duration)
  );
}

/** attackが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒット
 *
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: ShinBraverBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite)
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(all(
      delay(1800)
        .chain(param.attackerSprite.punchToStand()),

      toInitial(param.tdCamera, 100),

      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderSprite.knockBack(),
      param.defenderTD.hitMark.shockWave.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
    ));
}

/**
 * ガード
 *
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: ShinBraverBattle<Guard>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(all(
      delay(1800)
        .chain(param.attackerSprite.punchToStand()),

      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderSprite.guard(),
      param.defenderTD.hitMark.shockWave.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
    ));
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: ShinBraverBattle<Miss>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(
      delay(1800)
        .chain(param.attackerSprite.punchToStand()),

      param.defenderSprite.avoid()
    );
}

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: ShinBraverBattle<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid();
}

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 *
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: ShinBraverBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite)
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(all(
      delay(1800)
        .chain(param.attackerSprite.punchToStand()),

      toInitial(param.tdCamera, 100),

      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderSprite.down(),
      param.defenderTD.hitMark.shockWave.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
    ));
}