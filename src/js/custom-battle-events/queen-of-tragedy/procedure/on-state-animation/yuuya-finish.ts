import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { yuuyaFinishShout } from "../../animation/yuuya-finish-shout";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ トドメの一撃 */
export const yuuyaFinish: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, playerId } = props;
  const { effect } = currentState;
  const hasPlayerDeliveredFinishBlow = hasDeliveredFinishBlow(
    stateHistory,
    playerId,
  );

  if (
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId &&
    hasPlayerDeliveredFinishBlow
  ) {
    result = yuuyaFinishShout(props);
  } else if (
    effect.name === "Battle" &&
    effect.attacker === playerId &&
    hasPlayerDeliveredFinishBlow
  ) {
    result = empty();
  }

  return result;
};
