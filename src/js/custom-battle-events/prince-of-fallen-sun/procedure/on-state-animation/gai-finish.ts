import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { gaiFinishShout } from "../../animation/gai-finish-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ トドメの一撃 */
export const gaiFinish: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { currentState, enemyId, stateHistory } = props;
  const { effect } = currentState;
  const hasEnemyDeliveredFinishBlow = hasDeliveredFinishBlow(
    stateHistory,
    enemyId,
  );

  if (
    hasEnemyDeliveredFinishBlow &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiFinishShout(props);
  } else if (
    hasEnemyDeliveredFinishBlow &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
