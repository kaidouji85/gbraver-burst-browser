import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { ZeroDefenseTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & ZeroDefenseTutorialProps
>[] = [
  (props) =>
    isPlayerPilotSkillActivated(props)
      ? process(() => {
          props.view.dom.playerCryMessageWindow.visible(false);
        })
      : null,
];