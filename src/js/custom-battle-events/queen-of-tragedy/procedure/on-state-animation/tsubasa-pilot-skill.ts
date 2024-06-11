import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { tsubasaPilotSkillShout } from "../../animation/tsubasa-pilot-skill-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ パイロットスキル */
export const tsubasaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) =>
  isEnemyPilotSkillActivated(props) ? tsubasaPilotSkillShout(props) : null;
