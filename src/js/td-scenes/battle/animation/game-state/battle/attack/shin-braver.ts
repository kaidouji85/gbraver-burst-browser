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
import { ShinBraver } from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import { TDCamera } from "../../../../../../game-object/camera/td";
import { toInitial } from "../../../td-camera";
import { BattleAnimationParamX } from "../animation-param";

/**
 * シンブレイバー 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type ShinBraverBattle<RESULT extends BattleResult> =
  BattleAnimationParamX<ShinBraver, RESULT>;

/**
 * アタッカーにフォーカスを合わせる
 * @param camera カメラ
 * @param attacker スプライト
 * @returns アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: ShinBraver): Animate {
  const duration = 400;
  const x = attacker.getObject3D().position.x * 0.6;
  const z = "-30";
  return all(
    camera.move({ x, z }, duration),
    camera.lookAt({ x, z }, duration),
  );
}

/** attackが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒット
 * @param param パラメータ
 * @returns アニメーション
 */
function attack(param: ShinBraverBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1000)
          .chain(param.attackerSprite.punchToStand())
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
 * ガード
 * @param param パラメータ
 * @returns アニメーション
 */
function guard(param: ShinBraverBattle<Guard>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1000)
          .chain(param.attackerSprite.punchToStand())
          .chain(delay(500)),
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
function miss(param: ShinBraverBattle<Miss>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(param.defenderSprite.avoid())
    .chain(delay(500))
    .chain(param.attackerSprite.punchToStand())
    .chain(delay(500));
}

/**
 * フェイント
 * @param param パラメータ
 * @returns アニメーション
 */
function feint(param: ShinBraverBattle<Feint>): Animate {
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
function down(param: ShinBraverBattle<DownResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite),
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1500)
          .chain(param.attackerSprite.punchToStand())
          .chain(delay(500)),
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
 * シンブレイバーの攻撃アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function shinBraverAttack(
  param: ShinBraverBattle<BattleResult>,
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
