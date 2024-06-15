import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { shinyaBurstShout } from "../../animation/shinya-burst-shout";
import { shinyaBurstShoutToAvoidDeath } from "../../animation/shinya-burst-shout-to-avoid-death";
import { ZeroDefenseTutorialProps } from "../../props";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimation & ZeroDefenseTutorialProps
>[] = [
  (props) => {
    if (!isPlayerBurstActivatedFromCurrentState(props)) {
      return null;
    }
    return props.eventState.isExplainedBurstAtZeroBattery
      ? shinyaBurstShoutToAvoidDeath(props)
      : shinyaBurstShout(props);
  },
];
