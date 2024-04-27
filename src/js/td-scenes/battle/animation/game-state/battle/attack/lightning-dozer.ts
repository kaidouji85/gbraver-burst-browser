import type {
  BattleResult,
  CriticalHit,
  Feint,
  Guard,
  Miss,
  NormalHit,
} from "gbraver-burst-core";

import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay, empty } from "../../../../../../animation/delay";
import { LightningDozer } from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import { TDCamera } from "../../../../../../game-object/camera/td";
import { dolly, toInitial, track } from "../../../td-camera";
import type { BattleAnimationParamX } from "../animation-param";

/**
 * ライトニングドーザ 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type LightningDozerBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<LightningDozer, RESULT>;

/**
 * アタッカーにフォーカスを合わせる
 * attentionArmdozerよりもカメラ移動は控えめ
 * @param camera カメラ
 * @param attacker アタッカーのスプライト
 * @returns アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: LightningDozer): Animate {
  const duration = 400;
  return all(
    track(camera, attacker.getObject3D().position.x * 0.6, duration),
    dolly(camera, "-30", duration),
  );
}

/** 攻撃ヒットアニメが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒットアニメ
 * @param param パラメータ
 * @returns アニメーション
 */
function attack(param: LightningDozerBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.armHammer())
    .chain(
      all(
        delay(1000).chain(param.attackerSprite.hmToStand()).chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}

/**
 * ガード
 * @param param パラメータ
 * @returns アニメーション
 */
function guard(param: LightningDozerBattle<Guard>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.armHammer())
    .chain(
      all(
        delay(1000).chain(param.attackerSprite.hmToStand()).chain(delay(500)),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}

/**
 * ミス
 * @param param パラメータ
 * @returns アニメーション
 */
function miss(param: LightningDozerBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
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
 * @param param パラメータ
 * @returns アニメーション
 */
function down(param: LightningDozerBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.armHammer())
    .chain(
      all(
        delay(1500).chain(param.attackerSprite.hmToStand()).chain(delay(500)),
        param.attackerHUD.resultIndicator
          .slideIn()
          .chain(delay(500))
          .chain(param.attackerHUD.resultIndicator.moveToEdge()),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.down(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}

/**
 * フェイント
 * @param param パラメータ
 * @returns アニメーション
 */
function feint(param: LightningDozerBattle<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid().chain(delay(500));
}

/**
 * ライトニングドーザ 戦闘アニメーション
 * @param param パラメーター
 * @returns アニメーション
 */
export function lightningDozerAttack(
  param: LightningDozerBattle<BattleResult>,
): Animate {
  if (param.isDeath && param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return down({ ...param, result });
  }

  if (param.isDeath && param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return down({ ...param, result });
  }

  if (param.isDeath && param.result.name === "Guard") {
    const result: Guard = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.result.name === "Guard") {
    const result: Guard = param.result;
    return guard({ ...param, result });
  }

  if (param.result.name === "Miss") {
    const result: Miss = param.result;
    return miss({ ...param, result });
  }

  if (param.result.name === "Feint") {
    const result: Feint = param.result;
    return feint({ ...param, result });
  }

  return empty();
}
