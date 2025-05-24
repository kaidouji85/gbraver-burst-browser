import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEvenMatch } from "../../../is-even-match";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { yuuyaAttackShout1WhenEvenMatch } from "../../animation/yuuya-attack-shout1-when-even-match";
import { yuuyaAttackShout2WhenEvenMatch } from "../../animation/yuuya-attack-shout2-when-even-match";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ 攻撃（イーブンマッチ） */
export const yuuyaAttackWhenEvenMatch: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  const { playerId } = props;
  const { effect } = props.currentState;
  const separatedPlayers = separatePlayersFromCurrentState(props);
  const isEvenMatchGame = separatedPlayers
    ? isEvenMatch(separatedPlayers)
    : false;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId &&
    isEvenMatchGame
  ) {
    return yuuyaAttackShout1WhenEvenMatch(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === playerId &&
    isEvenMatchGame
  ) {
    return yuuyaAttackShout2WhenEvenMatch(props);
  }

  return null;
};
