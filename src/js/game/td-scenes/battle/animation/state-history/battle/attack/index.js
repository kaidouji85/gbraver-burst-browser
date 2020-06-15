// @flow

import {Animate} from "../../../../../../../animation/animate";
import {shinBraverAttack, castShinBraverBattle} from "./shin-braver";
import {neoLandozerAttack, castNeoLandozerBattle} from "./neo-landozer";
import {emptyAttackAnimation} from "./empty-animation";
import type {BattleAnimationParam} from "../animation-param";
import {lightningDozerAttack, castLightningDozerBattle} from "./lightning-dozer";

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
