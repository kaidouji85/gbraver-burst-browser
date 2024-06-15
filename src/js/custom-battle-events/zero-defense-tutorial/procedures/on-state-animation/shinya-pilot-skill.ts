import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { shinyaPilotSkillShout } from "../../animation/shinya-pilot-skill-shout";
import { shinyaPilotSkillShoutToAvoidDeath } from "../../animation/shinya-pilot-skill-shout-to-avoid-death";
import { ZeroDefenseTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & ZeroDefenseTutorialProps
>[] = [
  (props) => {
    if (!isPlayerPilotSkillActivatedFromCurrentState(props)) {
      return null;
    }
    return props.eventState.isExplainedPilotSkillAtZeroBattery
      ? shinyaPilotSkillShoutToAvoidDeath(props)
      : shinyaPilotSkillShout(props);
  },
];
