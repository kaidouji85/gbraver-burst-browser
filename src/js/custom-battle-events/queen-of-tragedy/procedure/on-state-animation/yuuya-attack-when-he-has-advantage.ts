import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerAdvantage } from "../../../is-player-advantage";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaAttackShoutWhenHeHasAdvantage } from "../../animation/yuuya-attack-shout-when-he-has-advantage";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃（ユウヤ有利） */
export const yuuyaAttackWhenHeHasAdvantage: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  const { playerId } = props;
  const { effect } = props.currentState;
  const separatedPlayers = separatePlayersFromCurrentState(props);
  const isYuuyaAdvantage = separatedPlayers
    ? isPlayerAdvantage(separatedPlayers)
    : false;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId &&
    isYuuyaAdvantage
  ) {
    return yuuyaAttackShoutWhenHeHasAdvantage(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === playerId &&
    isYuuyaAdvantage
  ) {
    return empty();
  }

  return null;
};
