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
import { WingDozer } from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import { TDCamera } from "../../../../../../game-object/camera/td";
import { dolly, toInitial, track } from "../../../td-camera";
import type { BattleAnimationParamX } from "../animation-param";

/**
 * ウィングドーザ 戦闘アニメーション パラメータ
 * @type Result 戦闘結果
 */
export type WingDozerBattle<Result extends BattleResult> =
  BattleAnimationParamX<WingDozer, Result>;

/**
 * アタッカーにフォーカスを合わせる
 * attentionArmdozerよりもカメラ移動は控えめ
 * @param camera カメラ
 * @param attacker アタッカーのスプライト
 * @returns アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: WingDozer): Animate {
  const duration = 400;
  return all(
    track(camera, attacker.getObject3D().position.x * 0.6, duration),
    dolly(camera, "-20", duration),
  );
}

/** attackが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * ウィングドーザ 攻撃ヒット
 * @param param パラメータ
 * @returns アニメーション
 */
function attack(param: WingDozerBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(600)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.upper())
    .chain(
      all(
        delay(1000)
          .chain(param.attackerSprite.upperToStand())
          .chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}

/**
 * ウィングドーザ 攻撃ガード
 * @param param パラメータ
 * @returns アニメーション
 */
function guard(param: WingDozerBattle<Guard>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(600))
    .chain(param.attackerSprite.upper())
    .chain(
      all(
        delay(1000)
          .chain(param.attackerSprite.upperToStand())
          .chain(delay(500)),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp),
      ),
    );
}

/**
 * ウィングドーザ 攻撃ミス
 * @param param パラメータ
 * @returns アニメーション
 */
function miss(param: WingDozerBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(600))
    .chain(param.attackerSprite.upper())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.upperToStand())
    .chain(delay(500));
}

/**
 * フェイント
 * @param param パラメータ
 * @returns アニメーション
 */
function feint(param: WingDozerBattle<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid().chain(delay(500));
}

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 * @param param パラメータ
 * @returns アニメーション
 */
function down(param: WingDozerBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(600)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.upper())
    .chain(
      all(
        delay(1500)
          .chain(param.attackerSprite.upperToStand())
          .chain(delay(500)),
        param.attackerHUD.resultIndicator
          .slideIn()
          .chain(delay(600))
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
 * ウィングドーザ 戦闘アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function wingDozerAttack(param: WingDozerBattle<BattleResult>): Animate {
  if (param.result.name === "NormalHit" && param.isDeath) {
    const result: NormalHit = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.result.name === "CriticalHit" && param.isDeath) {
    const result: CriticalHit = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.result.name === "Guard" && param.isDeath) {
    const result: Guard = param.result;
    return down({ ...param, result });
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
