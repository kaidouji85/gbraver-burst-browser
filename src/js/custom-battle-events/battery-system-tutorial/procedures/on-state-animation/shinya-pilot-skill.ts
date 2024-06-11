import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { shinyaPilotSkillShout } from "../../animation/shinya-pilot-skill-shout";
import { BatterySystemTutorialProps } from "../../props";

/** シンヤ パイロットスキル発動 */
export const shinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & BatterySystemTutorialProps
>[] = [
  (props) =>
    isPlayerPilotSkillActivatedFromCurrentState(props)
      ? shinyaPilotSkillShout(props)
      : null,
];
