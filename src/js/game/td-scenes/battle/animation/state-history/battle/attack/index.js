// @flow
import {Animate} from "../../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import type {BattleAnimationParam} from "../animation-param";
import {emptyAttackAnimation} from "./empty-animation";
import {castLightningDozerBattle, lightningDozerAttack} from "./lightning-dozer";
import {castNeoLandozerBattle, neoLandozerAttack} from "./neo-landozer";
import {shinBraverAttack} from "./shin-braver";
import {castWingDozerBattle, wingDozerAttack} from "./wing-dozer";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function attackAnimation(param: BattleAnimationParam): Animate {
  if(param.attackerSprite instanceof ShinBraver) {
    const attackerSprite: ShinBraver = param.attackerSprite;
    return shinBraverAttack({...param, attackerSprite});
  }

  const neoLandozer = castNeoLandozerBattle(param);
  if (neoLandozer) {
    return neoLandozerAttack(neoLandozer);
  }

  const lightningDozer = castLightningDozerBattle(param);
  if (lightningDozer) {
    return lightningDozerAttack(lightningDozer);
  }

  const wingDozer = castWingDozerBattle(param);
  if (wingDozer) {
    return wingDozerAttack(wingDozer);
  }

  return emptyAttackAnimation(param);
}
