import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { BurstTutorialProps } from "../../props";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimationProps & BurstTutorialProps
>[] = [
  (props) =>
    isPlayerBurstActivatedFromCurrentState(props)
      ? onStart(() => {
          props.view.dom.playerShoutMessageWindow.visible(false);
        })
      : null,
];
