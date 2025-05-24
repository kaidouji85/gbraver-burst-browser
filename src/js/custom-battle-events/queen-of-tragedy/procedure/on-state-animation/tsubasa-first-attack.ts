import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { getPlayerBattleCount } from "../../../get-battle-count";
import { tsubasaFirstAttackShout } from "../../animation/tsubasa-first-attack-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ ファーストアタック */
export const tsubasaFirstAttack: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const battleCount = getPlayerBattleCount(stateHistory, enemyId);

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
