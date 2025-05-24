import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { tsubasaFinishShout } from "../../animation/tsubasa-finish-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ トドメの一撃 */
export const tsubasaFinish: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  const { stateHistory, currentState, enemyId } = props;
  const { effect } = currentState;
  const hasEnemyDeliveredFinishBlow = hasDeliveredFinishBlow(
    stateHistory,
    enemyId,
  );

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId &&
    hasEnemyDeliveredFinishBlow
  ) {
    return tsubasaFinishShout(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === enemyId &&
    hasEnemyDeliveredFinishBlow
  ) {
    return empty();
  }

  return null;
};
