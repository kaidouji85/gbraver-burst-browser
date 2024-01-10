import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { BurstTutorialProps } from "../../props";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimation & BurstTutorialProps
>[] = [
  (props) =>
    isPlayerBurstActivated(props)
      ? process(() => {
          props.view.dom.playerCryMessageWindow.visible(false);
        })
      : null,
];
