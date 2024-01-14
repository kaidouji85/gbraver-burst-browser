import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { shinyaBurstCry } from "../../animation/shinya-burst-cry";
import { shinyaCryWhenSelfInitiatedBurst } from "../../animation/shinya-cry-when-self-initiated-burst";
import { BurstTutorialProps } from "../../props";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimation & BurstTutorialProps
>[] = [
  (props) => {
    if (!isPlayerBurstActivated(props)) {
      return null;
    }
    return props.state.isLoseIfNoDefense5Complete
      ? shinyaBurstCry(props)
      : shinyaCryWhenSelfInitiatedBurst(props);
  },
];
