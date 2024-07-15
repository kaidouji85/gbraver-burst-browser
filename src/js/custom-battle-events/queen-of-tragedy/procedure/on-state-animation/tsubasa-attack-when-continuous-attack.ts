import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaAttackShoutWhenContinuousAttack } from "../../animation/tsubasa-attack-shout-when-continuous-attack";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ 連続攻撃の2回目 */
export const tsubasaAttackWhenContinuousAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const battleCount = playerBattleCount(stateHistory, enemyId);

  if (
    battleCount === 3 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    return tsubasaAttackShoutWhenContinuousAttack(props);
  } else if (
    battleCount === 3 &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    return empty();
  }

  return null;
};
