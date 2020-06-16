// @flow

import {Animate} from "../../../../../../../animation/animate";
import {castShinBraverBattle, shinBraverAttack} from "./shin-braver";
import {castNeoLandozerBattle, neoLandozerAttack} from "./neo-landozer";
import {emptyAttackAnimation} from "./empty-animation";
import type {BattleAnimationParam} from "../animation-param";
import {castLightningDozerBattle, lightningDozerAttack} from "./lightning-dozer";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function attackAnimation(param: BattleAnimationParam): Animate {
  const shinBraver = castShinBraverBattle(param);
  if (shinBraver) {
    return shinBraverAttack(shinBraver);
  }

  const neoLandozer = castNeoLandozerBattle(param);
  if (neoLandozer) {
    return neoLandozerAttack(neoLandozer);
  }

  const lightningDozer = castLightningDozerBattle(param);
  if (lightningDozer) {
    return lightningDozerAttack(lightningDozer);
  }

  return emptyAttackAnimation(param);
}
