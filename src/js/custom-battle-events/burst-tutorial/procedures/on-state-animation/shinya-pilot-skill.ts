import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { shinyaShoutWhenSelfInitiatedPilotSkill } from "../../animation/shinya-shout-when-self-initiated-pilot-skill";
import { BurstTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & BurstTutorialProps
>[] = [
  (props) =>
    isPlayerPilotSkillActivated(props)
      ? shinyaShoutWhenSelfInitiatedPilotSkill(props)
      : null,
];
