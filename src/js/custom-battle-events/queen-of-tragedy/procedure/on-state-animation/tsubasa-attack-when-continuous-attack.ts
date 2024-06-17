import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { playerBattleCount } from "../../../battle-count";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaAttackShoutWhenContinuousAttack } from "../../animation/tsubasa-attack-shout-when-continuous-attack";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ 連続攻撃の2回目 */
export const tsubasaAttackWhenContinuousAttack: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { enemyId, stateHistory } = props;
  const { effect } = props.currentState;
  const battleCount = playerBattleCount(stateHistory, enemyId);

  if (
    battleCount === 3 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = tsubasaAttackShoutWhenContinuousAttack(props);
  }

  return result;
};
