import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { turnCount } from "../../../turn-count";
import { yuuyaBurstShoutWhenOneTurn } from "../../animation/yuuya-burst-shout-when-one-turn";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ バースト（1ターン目） */
export const yuuyaBurstWhenOneTurn: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;
  const { stateHistory, currentState, playerId } = props;
  const turn = turnCount(stateHistory);
  const isYuuyaBurst =
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === playerId;
  if (isYuuyaBurst && turn === 1) {
    result = yuuyaBurstShoutWhenOneTurn(props);
  }

  return result;
};
