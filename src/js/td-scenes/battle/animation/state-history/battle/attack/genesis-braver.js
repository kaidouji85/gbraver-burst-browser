// @flow

import type {BattleResult, CriticalHit, Guard, NormalHit} from "gbraver-burst-core";

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
export type GenesisBraverBattle<RESULT> = BattleAnimationParamX<
  GenesisBraver,
  RESULT
>;

/**
 * アタッカーにフォーカスを合わせる
 * @param camera カメラ
 * @param attacker スプライト
 * @return アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: GenesisBraver): Animate {
  const duration = 400;
  return all(
    track(camera, attacker.getObject3D().position.x * 0.6, duration),
    dolly(camera, "-30", duration)
  );
}

/** attackが受け取れる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒット
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: GenesisBraverBattle<AttackResult>): Animate {
  return all(
    param.attackerSprite.charge().chain(delay(500)),
    focusToAttacker(param.tdCamera, param.attackerSprite)
  )
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1000).chain(param.attackerSprite.spToStand()).chain(delay(500)),
        toInitial(param.tdCamera, 100),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.knockBack(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
    );
}

/**
 * ガード
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: GenesisBraverBattle<Guard>): Animate {
  return param.attackerSprite
    .charge()
    .chain(delay(500))
    .chain(param.attackerSprite.straightPunch())
    .chain(
      all(
        delay(1000)
          .chain(param.attackerSprite.spToStand())
          .chain(delay(500)),
        param.defenderTD.damageIndicator.popUp(param.result.damage),
        param.defenderSprite.guard(),
        param.defenderTD.hitMark.shockWave.popUp(),
        param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)
      )
    );
}

/**
 * ジェネシスブレイバー 攻撃アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function genesisBraverAttack(
  param: GenesisBraverBattle<BattleResult>
): Animate {
  if (param.result.name === "NormalHit") {
    const result = (param.result: NormalHit);
    return attack({ ...param, result });
  }

  if (param.result.name === "CriticalHit") {
    const result = (param.result: CriticalHit);
    return attack({ ...param, result });
  }

  if (param.result.name === "Guard") {
    const result = (param.result: Guard);
    return guard({ ...param, result });
  }

  return empty();
}
