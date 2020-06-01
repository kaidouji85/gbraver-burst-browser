// @flow

import {Animate} from "../../../../../../../animation/animate";
import {shinBraverAttack, toShinBraverBattleAnimationParam} from "./shin-braver";
import {neoLandozerAttack, toNeoLandozerBattleAnimtionParam} from "./neo-landozer";
import {emptyAttackAnimation} from "./empty-animation";
import type {BattleAnimationParam} from "../animation-param";
import {lightningDozerAttack, toLightningDozerBattleAnimationParam} from "./lightning-dozer";
import {toWingDozerBattleAnimationParam, wingDozerAttack} from "./wing-dozer";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function attackAnimation(param: BattleAnimationParam): Animate {
  const shinBraver = toShinBraverBattleAnimationParam(param);
  if (shinBraver) {
    return shinBraverAttack(shinBraver);
  }

  const neoLandozer = toNeoLandozerBattleAnimtionParam(param);
  if (neoLandozer) {
    return neoLandozerAttack(neoLandozer);
  }

  const lightningDozer = toLightningDozerBattleAnimationParam(param);
  if (lightningDozer) {
    return lightningDozerAttack(lightningDozer);
  }

  const wingDozer = toWingDozerBattleAnimationParam(param);
  if (wingDozer) {
    return wingDozerAttack(wingDozer);
  }

  return emptyAttackAnimation(param);
}
