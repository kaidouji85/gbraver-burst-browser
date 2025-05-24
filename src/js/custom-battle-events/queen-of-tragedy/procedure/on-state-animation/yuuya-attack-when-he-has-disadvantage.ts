import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyAdvantage } from "../../../is-enemy-advantage";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaAttackShoutWhenHeHasDisadvantage } from "../../animation/yuuya-attack-shout-when-he-has-disadvantage";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃（ユウヤ不利） */
export const yuuyaAttackWhenHeHasDisadvantage: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  const { playerId } = props;
  const { effect } = props.currentState;
  const separatedPlayers = separatePlayersFromCurrentState(props);
  const isYuuyaDisadvantage = separatedPlayers
    ? isEnemyAdvantage(separatedPlayers)
    : false;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId &&
    isYuuyaDisadvantage
  ) {
    return yuuyaAttackShoutWhenHeHasDisadvantage(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === playerId &&
    isYuuyaDisadvantage
  ) {
    return empty();
  }

  return null;
};
