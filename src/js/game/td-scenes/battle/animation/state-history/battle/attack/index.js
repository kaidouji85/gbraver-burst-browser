// @flow
import {Animate} from "../../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {NeoLandozer} from "../../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {shinBraverAttack, toShinBraverBattleAnimationParam} from "./shin-braver";
import {neoLandozerAttack, toNeoLandozerBattleAnimtionParam} from "./neo-landozer";
import {emptyAttackAnimation} from "./empty-animation";
import type {BattleAnimationParam, BattleAnimationParamX} from "../animation-param";
import type {BattleResult} from "gbraver-burst-core";
import {LightningDozer} from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {lightningDozerAttack} from "./lightning-dozer";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function attackAnimation(param: BattleAnimationParam): Animate {
  const sprite = param.attackerSprite;
  
  const shinBraver = toShinBraverBattleAnimationParam(param);
  if (shinBraver) {
    return shinBraverAttack(shinBraver);
  }

  const neoLandozer = toNeoLandozerBattleAnimtionParam(param);
  if (neoLandozer) {
    return neoLandozerAttack(neoLandozer);
  }

  if (sprite instanceof LightningDozer) {
    const castParam = ((param: any): BattleAnimationParamX<typeof sprite, BattleResult>);
    return lightningDozerAttack(castParam);
  }

  return emptyAttackAnimation(param);
}
