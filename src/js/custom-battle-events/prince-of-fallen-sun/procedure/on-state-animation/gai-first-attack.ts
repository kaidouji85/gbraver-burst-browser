import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiFirstAttackShout1 } from "../../animation/gai-first-attack-shout1";
import { gaiFirstAttackShout2 } from "../../animation/gai-first-attack-shout2";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ ファーストアタック */
export const gaiFirstAttack: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, enemyId } = props;
  const { effect } = currentState;
  const battleCount = playerBattleCount(stateHistory, enemyId);

  if (
    battleCount === 1 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiFirstAttackShout1(props);
  } else if (
    battleCount === 1 &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = gaiFirstAttackShout2(props);
  }

  return result;
};
