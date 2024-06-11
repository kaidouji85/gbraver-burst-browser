import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { ZeroDefenseTutorialProps } from "../../props";

/** シンヤ バースト発動 */
export const shinyaBurst: ConditionalAnimation<
  CustomStateAnimation & ZeroDefenseTutorialProps
>[] = [
  (props) =>
    isPlayerBurstActivatedFromCurrentState(props)
      ? onStart(() => {
          props.view.dom.playerShoutMessageWindow.visible(false);
        })
      : null,
];
