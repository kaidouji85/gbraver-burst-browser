import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaFirstAttackShout1 } from "../../animation/yuuya-first-attack-shout1";
import { yuuyaFirstAttackShout2 } from "../../animation/yuuya-first-attack-shout2";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃 */
export const yuuyaAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
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
    result = yuuyaFirstAttackShout1(props);
  } else if (
    battleCount === 1 &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = yuuyaFirstAttackShout2(props);
  }

  return result;
};
