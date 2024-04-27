import { Animate } from "../../../../../../animation/animate";
import { GenesisBraver } from "../../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import { LightningDozer } from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import { NeoLandozer } from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import { ShinBraver } from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import { WingDozer } from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import type { BattleAnimationParam } from "../animation-param";
import { emptyAttackAnimation } from "./empty-animation";
import { genesisBraverAttack } from "./genesis-braver";
import { lightningDozerAttack } from "./lightning-dozer";
import { neoLandozerAttack } from "./neo-landozer";
import { shinBraverAttack } from "./shin-braver";
import { wingDozerAttack } from "./wing-dozer";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 * @param param 戦闘アニメパラメータ
 * @returns アニメーション
 */
export function attackAnimation(param: BattleAnimationParam): Animate {
  if (param.attackerSprite instanceof ShinBraver) {
    const attackerSprite: ShinBraver = param.attackerSprite;
    return shinBraverAttack({ ...param, attackerSprite });
  }

  if (param.attackerSprite instanceof NeoLandozer) {
    const attackerSprite: NeoLandozer = param.attackerSprite;
    return neoLandozerAttack({ ...param, attackerSprite });
  }

  if (param.attackerSprite instanceof LightningDozer) {
    const attackerSprite: LightningDozer = param.attackerSprite;
    return lightningDozerAttack({ ...param, attackerSprite });
  }

  if (param.attackerSprite instanceof WingDozer) {
    const attackerSprite: WingDozer = param.attackerSprite;
    return wingDozerAttack({ ...param, attackerSprite });
  }

  if (param.attackerSprite instanceof GenesisBraver) {
    const attackerSprite: GenesisBraver = param.attackerSprite;
    return genesisBraverAttack({ ...param, attackerSprite });
  }

  return emptyAttackAnimation(param);
}
