import { Animate } from "../../../../animation/animate";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaBurstShout } from "../../animation/yuuya-burst-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ バースト */
export const yuuyaBurst: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;
  const { currentState, playerId } = props;
  const isYuuyaBurst =
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === playerId;
  if (isYuuyaBurst) {
    result = yuuyaBurstShout(props);
  }

  return result;
};
