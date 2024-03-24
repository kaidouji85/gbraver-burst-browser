import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { turnCount } from "../../../turn-count";
import { earlyShinyaBurstShout } from "../../animation/early-shinya-burst-shout";
import { shinyaBurstShout } from "../../animation/shinya-burst-shout";
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
      ? earlyShinyaBurstShout(props)
      : null;
  },
  (props) => {
    return EARLY_TURN_LIMIT < turnCount(props.stateHistory) &&
      isPlayerBurstActivated(props)
      ? shinyaBurstShout(props)
      : null;
  },
];
