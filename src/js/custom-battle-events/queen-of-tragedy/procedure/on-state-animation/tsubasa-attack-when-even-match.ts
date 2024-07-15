import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEvenMatch } from "../../../is-even-match";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { tsubasaAttackShoutWhenEvenMatch } from "../../animation/tsubasa-attack-shout-when-even-match";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ 攻撃（イーブンマッチ） */
export const tsubasaAttackWhenEvenMatch: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const { enemyId } = props;
  const { effect } = props.currentState;
  const separatedPlayers = separatePlayersFromCurrentState(props);
  const isEvenMatchGa = separatedPlayers
    ? isEvenMatch(separatedPlayers)
    : false;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    isEvenMatchGa
  ) {
    return tsubasaAttackShoutWhenEvenMatch(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    isEvenMatchGa
  ) {
    return empty();
  }

  return null;
};
