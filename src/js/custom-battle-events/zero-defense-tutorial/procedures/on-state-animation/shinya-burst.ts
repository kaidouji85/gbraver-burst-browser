import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { shinyaBurstCry } from "../../animation/shinya-burst-cry";
import { ZeroDefenseTutorialProps } from "../../props";
import { shinyaBurstCryToAvoidDeath } from "../../animation/shinya-burst-cry-to-avoid-death";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimation & ZeroDefenseTutorialProps
>[] = [
  (props) => {
    if (!isPlayerBurstActivated(props)) {
      return null;
    }
    return props.state.isExplainedBurstAtZeroBattery
      ? shinyaBurstCryToAvoidDeath(props)
      : shinyaBurstCry(props);
  },
];
