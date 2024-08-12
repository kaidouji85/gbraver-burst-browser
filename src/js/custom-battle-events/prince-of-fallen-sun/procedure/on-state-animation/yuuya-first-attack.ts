import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaFirstAttackShout } from "../../animation/yuuya-first-attack-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ ファーストアタック */
export const yuuyaFirstAttack: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, playerId } = props;
  const { effect } = currentState;
  const battleCount = playerBattleCount(stateHistory, playerId);

  if (
    battleCount === 1 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaFirstAttackShout(props);
  } else if (
    battleCount === 1 &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = empty();
  }

  return result;
};
