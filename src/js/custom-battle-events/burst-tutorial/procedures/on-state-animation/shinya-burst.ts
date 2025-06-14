import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { shinyaBurstShout } from "../../animation/shinya-burst-shout";
import { shinyaShoutWhenSelfInitiatedBurst } from "../../animation/shinya-shout-when-self-initiated-burst";
import { BurstTutorialProps } from "../../props";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimationProps & BurstTutorialProps
>[] = [
  (props) => {
    if (!isPlayerBurstActivatedFromCurrentState(props)) {
      return null;
    }
    return props.eventState.isLoseIfNoDefense5Complete
      ? shinyaBurstShout(props)
      : shinyaShoutWhenSelfInitiatedBurst(props);
  },
];
