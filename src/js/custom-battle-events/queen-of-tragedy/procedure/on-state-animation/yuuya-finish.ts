import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { yuuyaFinishShout } from "../../animation/yuuya-finish-shout";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ トドメの一撃 */
export const yuuyaFinish: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
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
  }

  return result;
};
