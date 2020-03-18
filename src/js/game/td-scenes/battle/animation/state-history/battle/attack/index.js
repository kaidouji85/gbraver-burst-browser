// @flow
import {Animate} from "../../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {NeoLandozer} from "../../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {shinBraverAttack} from "./shin-braver";
import {neoLandozerAttack} from "./neo-landozer";
import {emptyAttackAnimation} from "./empty-animation";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import type {ArmDozerSprite} from "../../../../../../../game-object/armdozer/armdozer-sprite";
import type {BattleResult} from "gbraver-burst-core";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function attackAnimation(param: BattleAnimationParam): Animate {
  const sprite = param.attackerSprite;
  if (sprite instanceof ShinBraver) {
    const castParam = ((param: any): BattleAnimationParamX<typeof sprite, BattleResult>);
    return shinBraverAttack(castParam);
  } else if (sprite instanceof NeoLandozer) {
    const castParam = ((param: any): BattleAnimationParamX<typeof sprite, BattleResult>);
    return neoLandozerAttack(castParam);
  }

  return emptyAttackAnimation(param);
}
