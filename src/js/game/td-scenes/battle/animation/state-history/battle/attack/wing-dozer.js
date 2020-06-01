// @flow

import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import {WingDozer} from "../../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {Animate} from "../../../../../../../animation/animate";
import {delay, empty} from "../../../../../../../animation/delay";
import type {CriticalHit, NormalHit} from "gbraver-burst-core";
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
export function toWingDozerBattleAnimationParam(origin: BattleAnimationParam): ?WingDozerBattle<BattleResult> {
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
  if (param.result.name === 'NormalHit') {
    const castResult = (param.result: NormalHit);
    const castParam = ((param: any): WingDozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  if (param.result.name === 'CriticalHit') {
    const castResult = (param.result: CriticalHit);
    const castParam = ((param: any): WingDozerBattle<AttackResult | typeof castResult>);
    return attack(castParam);
  }

  return empty();
}

/**
 * attackが受け取れる戦闘結果
 */
type AttackResult = NormalHit | CriticalHit;

/**
 * ウィングドーザ 攻撃
 *
 * @param param パラメータ
 * @return アニメーション
 */
function attack(param: WingDozerBattle<AttackResult>): Animate {
  return param.attackerSprite.charge()
    .chain(delay(700))
    .chain(all(
      param.attackerSprite.upper()
        .chain(delay(1500))
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
