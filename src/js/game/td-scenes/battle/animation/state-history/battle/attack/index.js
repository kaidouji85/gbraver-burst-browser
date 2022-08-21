// @flow
import {Animate} from "../../../../../../../animation/animate";
import {LightningDozer} from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {NeoLandozer} from "../../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {ShinBraver} from "../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import type {BattleAnimationParam} from "../animation-param";
import {emptyAttackAnimation} from "./empty-animation";
import {lightningDozerAttack} from "./lightning-dozer";
import {neoLandozerAttack} from "./neo-landozer";
import {shinBraverAttack} from "./shin-braver";
import {castWingDozerBattle, wingDozerAttack} from "./wing-dozer";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param param 戦闘アニメパラメータ
 * @return アニメーション
 */
export function attackAnimation(param: BattleAnimationParam): Animate {
  if (param.attackerSprite instanceof ShinBraver) {
    const attackerSprite: ShinBraver = param.attackerSprite;
    return shinBraverAttack({...param, attackerSprite});
  }

  if (param.attackerSprite instanceof NeoLandozer) {
    const attackerSprite: NeoLandozer = param.attackerSprite;
    return neoLandozerAttack({...param, attackerSprite});
  }

  if (param.attackerSprite instanceof LightningDozer) {
    const attackerSprite: LightningDozer = param.attackerSprite;
    return lightningDozerAttack({...param, attackerSprite});
  }

  const wingDozer = castWingDozerBattle(param);
  if (wingDozer) {
    return wingDozerAttack(wingDozer);
  }

  return emptyAttackAnimation(param);
}
