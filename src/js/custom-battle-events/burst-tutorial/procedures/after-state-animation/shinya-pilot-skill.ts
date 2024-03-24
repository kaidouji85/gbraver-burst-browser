import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { BurstTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & BurstTutorialProps
>[] = [
  (props) =>
    isPlayerPilotSkillActivated(props)
      ? onStart(() => {
          props.view.dom.playerShoutMessageWindow.visible(false);
        })
      : null,
];
