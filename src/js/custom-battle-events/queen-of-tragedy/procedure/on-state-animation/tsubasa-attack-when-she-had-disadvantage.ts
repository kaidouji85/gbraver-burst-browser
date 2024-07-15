import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerAdvantage } from "../../../is-player-advantage";
import { separatePlayersFromCurrentState } from "../../../separate-players";
import { tsubasaAttackShout1WhenSheHasDisadvantage } from "../../animation/tsubasa-attack-shout1-when-she-has-disadvantage";
import { tsubasaAttackShout2WhenSheHasDisadvantage } from "../../animation/tsubasa-attack-shout2-when-she-has-disadvantage";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ 攻撃（ツバサ不利） */
export const tsubasaAttackWhenSheHadDisadvantage: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const { enemyId } = props;
  const { effect } = props.currentState;
  const separatedPlayers = separatePlayersFromCurrentState(props);
  const isTsubasaDisadvantage = separatedPlayers
    ? isPlayerAdvantage(separatedPlayers)
    : false;

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    isTsubasaDisadvantage
  ) {
    return tsubasaAttackShout1WhenSheHasDisadvantage(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    isTsubasaDisadvantage
  ) {
    return tsubasaAttackShout2WhenSheHasDisadvantage(props);
  }

  return null;
};
