import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { shinyaPilotSkillCry } from "../../animation/shinya-pilot-skill-cry";
import { shinyaPilotSkillCryToAvoidDeath } from "../../animation/shinya-pilot-skill-cry-to-avoid-death";
import { ZeroDefenseTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & ZeroDefenseTutorialProps
>[] = [
  (props) => {
    if (!isPlayerPilotSkillActivated(props)) {
      return null;
    }
    return props.state.isExplainedPilotSkillAtZeroBattery
      ? shinyaPilotSkillCryToAvoidDeath(props)
      : shinyaPilotSkillCry(props);
  },
];
