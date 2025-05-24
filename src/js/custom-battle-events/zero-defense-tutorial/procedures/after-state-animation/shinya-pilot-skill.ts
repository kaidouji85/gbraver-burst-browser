import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { ZeroDefenseTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimationProps & ZeroDefenseTutorialProps
>[] = [
  (props) =>
    isPlayerPilotSkillActivatedFromCurrentState(props)
      ? onStart(() => {
          props.view.dom.playerShoutMessageWindow.visible(false);
        })
      : null,
];
