import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiSecondAttackShout } from "../../animation/gai-second-attack-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ セカンドアタック */
export const gaiSecondAttack: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, enemyId } = props;
  const { effect } = currentState;
  const battleCount = playerBattleCount(stateHistory, enemyId);

  if (
    battleCount === 2 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiSecondAttackShout(props);
  } else if (
    battleCount === 2 &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
