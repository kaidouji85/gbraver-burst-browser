import type { BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit } from "gbraver-burst-core";
import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { delay, empty } from "../../../../../../animation/delay";
import { NeoLandozer } from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import { TDCamera } from "../../../../../../game-object/camera/td";
import { dolly, toInitial, track } from "../../../td-camera";
import type { BattleAnimationParamX } from "../animation-param";

/**
 * ネオランドーザ 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type NeoLandozerBattle<RESULT extends BattleResult> = BattleAnimationParamX<NeoLandozer, RESULT>;

/**
 * アタッカーにフォーカスを合わせる
 * @param camera カメラ
 * @param attacker アタッカーのスプライト
 * @return アニメーション
 */
function focusToAttacker(camera: TDCamera, attacker: NeoLandozer): Animate {
  const duration = 400;
  return all(track(camera, attacker.getObject3D().position.x * 0.6, duration), dolly(camera, "-30", duration));
}

/** attackが受け取ることができる戦闘結果 */
type AttackResult = NormalHit | CriticalHit;

/**
 * 攻撃ヒット
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: NeoLandozerBattle<AttackResult>): Animate {
  return all(param.attackerSprite.charge().chain(delay(500)), focusToAttacker(param.tdCamera, param.attackerSprite)).chain(param.attackerSprite.armHammer()).chain(all(delay(1000).chain(param.attackerSprite.hmToStand()).chain(delay(500)), toInitial(param.tdCamera, 100), param.defenderTD.damageIndicator.popUp(param.result.damage), param.defenderSprite.knockBack(), param.defenderTD.hitMark.shockWave.popUp(), param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)));
}

/**
 * ガード
 * @param param パラメータ
 * @return アニメーション
 */
function guard(param: NeoLandozerBattle<Guard>): Animate {
  return param.attackerSprite.charge().chain(delay(500)).chain(param.attackerSprite.armHammer()).chain(all(delay(1000).chain(param.attackerSprite.hmToStand()).chain(delay(500)), param.defenderTD.damageIndicator.popUp(param.result.damage), param.defenderSprite.guard(), param.defenderTD.hitMark.shockWave.popUp(), param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)));
}

/**
 * ミス
 * @param param パラメータ
 * @return アニメーション
 */
function miss(param: NeoLandozerBattle<Miss>): Animate {
  return param.attackerSprite.charge().chain(delay(500)).chain(param.attackerSprite.armHammer()).chain(param.defenderSprite.avoid()).chain(delay(500)).chain(param.attackerSprite.hmToStand()).chain(delay(500));
}

/**
 * フェイント
 * @param param パラメータ
 * @return アニメーション
 */
function feint(param: NeoLandozerBattle<Feint>): Animate {
  if (!param.result.isDefenderMoved) {
    return empty();
  }

  return param.defenderSprite.avoid().chain(delay(500));
}

/** downが受け取ることができる戦闘結果 */
type DownResult = NormalHit | Guard | CriticalHit;

/**
 * とどめ
 * @param param パラメータ
 * @return アニメーション
 */
function down(param: NeoLandozerBattle<DownResult>): Animate {
  return all(param.attackerSprite.charge().chain(delay(500)), focusToAttacker(param.tdCamera, param.attackerSprite)).chain(param.attackerSprite.armHammer()).chain(all(delay(1500).chain(param.attackerSprite.hmToStand()).chain(delay(500)), param.attackerHUD.resultIndicator.slideIn().chain(delay(500)).chain(param.attackerHUD.resultIndicator.moveToEdge()), toInitial(param.tdCamera, 100), param.defenderTD.damageIndicator.popUp(param.result.damage), param.defenderSprite.down(), param.defenderTD.hitMark.shockWave.popUp(), param.defenderHUD.gauge.hp(param.defenderState.armdozer.hp)));
}

/**
 * ネオランドーザの攻撃アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
export function neoLandozerAttack(param: NeoLandozerBattle<BattleResult>): Animate {
  if (param.isDeath && param.result.name === "NormalHit") {
    const result = (param.result as NormalHit);
    return down({ ...param,
      result
    });
  }

  if (param.result.name === "NormalHit") {
    const result = (param.result as NormalHit);
    return attack({ ...param,
      result
    });
  }

  if (param.isDeath && param.result.name === "CriticalHit") {
    const result = (param.result as CriticalHit);
    return down({ ...param,
      result
    });
  }

  if (param.result.name === "CriticalHit") {
    const result = (param.result as CriticalHit);
    return attack({ ...param,
      result
    });
  }

  if (param.isDeath && param.result.name === "Guard") {
    const result = (param.result as Guard);
    return down({ ...param,
      result
    });
  }

  if (param.result.name === "Guard") {
    const result = (param.result as Guard);
    return guard({ ...param,
      result
    });
  }

  if (param.result.name === "Miss") {
    const result = (param.result as Miss);
    return miss({ ...param,
      result
    });
  }

  if (param.result.name === "Feint") {
    const result = (param.result as Feint);
    return feint({ ...param,
      result
    });
  }

  return empty();
}