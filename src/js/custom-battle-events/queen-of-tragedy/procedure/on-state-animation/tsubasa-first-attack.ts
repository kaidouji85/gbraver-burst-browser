import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaFirstAttackShout } from "../../animation/tsubasa-first-attack-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ ファーストアタック */
export const tsubasaFirstAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const battleCount = playerBattleCount(stateHistory, enemyId);

  if (
    battleCount === 1 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = tsubasaFirstAttackShout(props);
  }

  return result;
};
