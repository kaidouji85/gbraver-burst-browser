import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { yuuyaPilotSkillShout } from "../../animation/yuuya-pilot-skill-shout";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ パイロットスキル */
export const yuuyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) =>
  isPlayerPilotSkillActivatedFromCurrentState(props)
    ? yuuyaPilotSkillShout(props)
    : null;
