import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaSecondAttackShout1 } from "../../animation/yuuya-second-attack-shout1";
import { yuuyaSecondAttackShout2 } from "../../animation/yuuya-second-attack-shout2";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ セカンドアタック */
export const yuuyaSecondAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, playerId, eventState } = props;
  const { effect } = currentState;
  const battleCount = playerBattleCount(stateHistory, playerId);

  if (
    battleCount === 2 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaSecondAttackShout1(props);
  } else if (
    battleCount === 2 &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = yuuyaSecondAttackShout2(props);
  }

  return result;
};
