import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFirstAttackShout } from "../../animation/tsubasa-first-attack-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ ファーストアタック */
export const tsubasaFirstAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const battleCount = playerBattleCount(stateHistory, enemyId);

  if (
    battleCount === 1 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    return tsubasaFirstAttackShout(props);
  } else if (
    battleCount === 1 &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    return empty();
  }

  return null;
};
