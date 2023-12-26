import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { turnCount } from "../../../turn-count";
import { earlyShinyaBurstCry } from "../../animation/early-shinya-burst-cry";
import { shinyaBurstCry } from "../../animation/shinya-burst-cry";
import { ConfrontationTwoBraverProps } from "../../props";

/** 序盤とされるターン数の上限 */
const EARLY_TURN_LIMIT = 2;

/** シンヤ バースト 叫び */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return turnCount(props.stateHistory) <= EARLY_TURN_LIMIT &&
      isPlayerBurstActivated(props)
      ? earlyShinyaBurstCry(props)
      : null;
  },
  (props) => {
    return EARLY_TURN_LIMIT < turnCount(props.stateHistory) &&
      isPlayerBurstActivated(props)
      ? shinyaBurstCry(props)
      : null;
  },
];
