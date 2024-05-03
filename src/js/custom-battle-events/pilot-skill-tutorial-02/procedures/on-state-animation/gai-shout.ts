import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { gaiPilotSkill } from "../../animation/gai-pilot-skill";
import { PilotSkillTutorial02Props } from "../../props";

/** ガイの叫び */
export const gaiShout: ConditionalAnimation<
  CustomStateAnimation & PilotSkillTutorial02Props
>[] = [
  (props) => (isPlayerPilotSkillActivated(props) ? gaiPilotSkill(props) : null),

];
