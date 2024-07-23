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
import { GenesisBraver } from "../../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import { TDCamera } from "../../../../../../game-object/camera/td";
import { dolly, toInitial, track } from "../../../td-camera";
import type { BattleAnimationParamX } from "../animation-param";

/**
 * ジェネシスブレイバー 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type GenesisBraverBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<GenesisBraver, RESULT>;

/**
 * アタッカーにフォーカスを合わせる
 * @param camera カメラ
 * @param attacker スプライト
 * @returns アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: GenesisBraver): Animate {
  const duration = 400;
  return all(
    track(camera, attacker.getObject3D().position.x * 0.6, duration),
    dolly(camera, "-30", duration),
  );
}

/** downが受け取れる戦闘結果 */
type DownResult = NormalHit | CriticalHit | Guard;

/**
 * とどめ
 * @param param パラメータ
 * @returns アニメーション
 */
function down(param: GenesisBraverBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1500).chain(param.attackerSprite.spToStand()).chain(delay(500)),
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

/** attackが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒット
 * @param param パラメータ
 * @returns アニメーション
 */
function attack(param: GenesisBraverBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1000).chain(param.attackerSprite.spToStand()).chain(delay(500)),
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
function guard(param: GenesisBraverBattle<Guard>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1000).chain(param.attackerSprite.spToStand()).chain(delay(500)),
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
function miss(param: GenesisBraverBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.spToStand())
    .chain(delay(500));
}

/**
 * フェイント
 * @param param パラメータ
 * @returns アニメーション
 */
function feint(param: GenesisBraverBattle<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid().chain(delay(500));
}

/**
 * ジェネシスブレイバー 攻撃アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function genesisBraverAttack(
  param: GenesisBraverBattle<BattleResult>,
): Animate {
  if (param.isDeath && param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "NormalHit") {
    const result: NormalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.isDeath && param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return down({ ...param, result });
  }

  if (param.result.name === "CriticalHit") {
    const result: CriticalHit = param.result;
    return attack({ ...param, result });
  }

  if (param.isDeath && param.result.name === "Guard") {
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
