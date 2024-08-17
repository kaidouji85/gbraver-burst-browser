import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { PrinceOfFallenSunProps } from "../../props";
import { gaiFeintSuccessShout } from "../../animation/gai-feint-success-shout";

/** ガイ フェイント成功 */
export const gaiFeintSuccess: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { currentState, enemyId } = props;
  const { effect } = currentState;
  const isBatteryDeclarationOnFeintSuccess =
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    effect.attackerBattery === 0 &&
    0 < effect.defenderBattery;
  const isBattleOnFeintSuccess =
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    effect.result.name === "Feint" &&
    effect.result.isDefenderMoved;

  if (isBatteryDeclarationOnFeintSuccess) {
    result = gaiFeintSuccessShout(props);
  } else if (isBattleOnFeintSuccess) {
    result = empty();
  }
  return result;
};
