import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { BatterySystemTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & BatterySystemTutorialProps
>[] = [
  (props) =>
    isPlayerPilotSkillActivatedFromCurrentState(props)
      ? onStart(() => {
          props.view.dom.playerShoutMessageWindow.visible(false);
        })
      : null,
];
