import { Animate } from "../../../../../../animation/animate";
import { GenesisBraver } from "../../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import { LightningDozer } from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import { NeoLandozer } from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import { ShinBraver } from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import { WingDozer } from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import { BattleAnimationParam } from "../animation-param";
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
  let ret = emptyAttackAnimation(param);

  const { attackerSprite } = param;
  if (attackerSprite instanceof ShinBraver) {
    ret = shinBraverAttack({ ...param, attackerSprite });
  } else if (attackerSprite instanceof NeoLandozer) {
    ret = neoLandozerAttack({ ...param, attackerSprite });
  } else if (attackerSprite instanceof LightningDozer) {
    ret = lightningDozerAttack({ ...param, attackerSprite });
  } else if (attackerSprite instanceof WingDozer) {
    ret = wingDozerAttack({ ...param, attackerSprite });
  } else if (attackerSprite instanceof GenesisBraver) {
    ret = genesisBraverAttack({ ...param, attackerSprite });
  }

  return ret;
}
