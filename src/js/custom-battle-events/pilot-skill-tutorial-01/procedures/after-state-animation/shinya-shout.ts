import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivated } from "../../../is-burst-activated";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { PilotSkillTutorial01Props } from "../../props";

/** シンヤ 叫び */
export const shinyaShout: ConditionalAnimation<
  CustomStateAnimation & PilotSkillTutorial01Props
>[] = [
  (props) =>
    isPlayerPilotSkillActivated(props)
      ? onStart(() => {
          props.view.dom.enemyShoutMessageWindow.visible(false);
        })
      : null,
  (props) =>
    isPlayerBurstActivated(props)
      ? onStart(() => {
          props.view.dom.enemyShoutMessageWindow.visible(false);
        })
      : null,
];
