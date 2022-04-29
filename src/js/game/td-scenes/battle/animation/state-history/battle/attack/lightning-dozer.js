// @flow
import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {LightningDozer} from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {delay, empty} from "../../../../../../../animation/delay";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit} from "gbraver-burst-core";
import {all} from "../../../../../../../animation/all";
import {dolly, toInitial, track} from "../../../td-camera";
import {TDCamera} from "../../../../../../../game-object/camera/td";

/**
 * ライトニングドーザ 戦闘アニメーション パラメータ
 *
 * @template RESULT 戦闘結果
 */
export type LightningDozerBattle<RESULT> = BattleAnimationParamX<LightningDozer, RESULT>

/**
 * ライトニングドーザ戦闘アニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param param キャスト元
 * @return キャスト結果
 */
export function castLightningDozerBattle(param: BattleAnimationParam): ?LightningDozerBattle<BattleResult> {
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
export function lightningDozerAttack(param: LightningDozerBattle<BattleResult>): Animate {
  if (param.isDeath && param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): LightningDozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.isDeath && param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): LightningDozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.isDeath && param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): LightningDozerBattle<DownResult | typeof castResult>);
    return down(castParam);
  }

  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): LightningDozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): LightningDozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'Guard') {
    const castResult = (param.result: Guard);
    const castParam = ((param: any): LightningDozerBattle<Guard | typeof castResult>);
    return guard(castParam);
  }

  if (param.result.name === 'Miss') {
    const castResult = (param.result: Miss);
    const castParam = ((param: any): LightningDozerBattle<Miss | typeof castResult>);
    return miss(castParam);
  }

  if (param.result.name === 'Feint') {
    const castResult = (param.result: Feint);
    const castParam = ((param: any): LightningDozerBattle<Feint | typeof castResult>);
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
function focusToAttacker(camera: TDCamera, attacker: LightningDozer): Animate {
  const duration = 400;
  return all(
    track(camera, attacker.getObject3D().position.x * 0.6, duration),
    dolly(camera, '-30', duration)
  );
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
function attack(param: LightningDozerBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite)
  )
    .chain(param.attackerSprite.armHammer())
    .chain(all(
      delay(1000)
        .chain(param.attackerSprite.hmToStand())
        .chain(delay(500)),
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
function guard(param: LightningDozerBattle<Guard>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(500))
    .chain(param.attackerSprite.armHammer())
    .chain(all(
      delay(1000)
        .chain(param.attackerSprite.hmToStand())
        .chain(delay(500)),
      param.defenderTD.damageIndicator.popUp(param.result.damage),
      param.defenderSprite.guard(),
      param.defenderTD.hitMark.shockWave.popUp(),
      param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
    ));
}

/**
 * ミス
 *
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: LightningDozerBattle<Miss>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(500))
    .chain(param.attackerSprite.armHammer())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.hmToStand())
    .chain(delay(500));
}

/** ダウンが受け取れる戦闘結果 */
type DownResult = NormalHit | Guard | CriticalHit;

/**
 * とどめ
 *
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: LightningDozerBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge()
      .chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite)
  )
    .chain(param.attackerSprite.armHammer())
    .chain(all(
      delay(1500)
        .chain(param.attackerSprite.hmToStand())
        .chain(delay(500)),
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

/**
 * フェイント
 *
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: LightningDozerBattle<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid()
    .chain(delay(500));
}