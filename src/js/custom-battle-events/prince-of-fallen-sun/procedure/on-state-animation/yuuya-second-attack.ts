import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaSecondAttackShout } from "../../animation/yuuya-second-attack-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ セカンドアタック */
export const yuuyaSecondAttack: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, playerId } = props;
  const { effect } = currentState;
  const battleCount = playerBattleCount(stateHistory, playerId);

  if (
    battleCount === 2 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaSecondAttackShout(props);
  } else if (
    battleCount === 2 &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = empty();
  }

  return result;
};
