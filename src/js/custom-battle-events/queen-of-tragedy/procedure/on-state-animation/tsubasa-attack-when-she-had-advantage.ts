import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyAdvantage } from "../../../is-enemy-advantage";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { tsubasaAttackShoutWhenSheHasAdvantage } from "../../animation/tsubasa-attack-shout-when-she-has-advantage";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ 攻撃（ツバサ有利） */
export const tsubasaAttackWhenSheHadAdvantage: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const { enemyId } = props;
  const { effect } = props.currentState;
  const separatedPlayers = separatePlayersFromCurrentState(props);
  const isTsubasaAdvantage = separatedPlayers
    ? isEnemyAdvantage(separatedPlayers)
    : false;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    isTsubasaAdvantage
  ) {
    return tsubasaAttackShoutWhenSheHasAdvantage(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    isTsubasaAdvantage
  ) {
    return empty();
  }

  return null;
};
