import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { shinyaBurstCry } from "../../animation/shinya-burst-cry";
import { BurstTutorialProps } from "../../props";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimation & BurstTutorialProps
>[] = [
  (props) => (isPlayerBurstActivated(props) ? shinyaBurstCry(props) : null),
];
