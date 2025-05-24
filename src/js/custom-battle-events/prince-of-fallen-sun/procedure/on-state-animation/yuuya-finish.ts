import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";
import { yuuyaFinishShout } from "../../animation/yuuya-finish-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ とどめ */
export const yuuyaFinish: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { stateHistory, currentState, playerId } = props;
  const { effect } = currentState;
  const hasPlayerDeliveredFinishBlow = hasDeliveredFinishBlow(
    stateHistory,
    playerId,
  );

  if (
    hasPlayerDeliveredFinishBlow &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === playerId
  ) {
    result = yuuyaFinishShout(props);
  } else if (
    hasPlayerDeliveredFinishBlow &&
    effect.name === "Battle" &&
    effect.attacker === playerId
  ) {
    result = empty();
  }

  return result;
};
