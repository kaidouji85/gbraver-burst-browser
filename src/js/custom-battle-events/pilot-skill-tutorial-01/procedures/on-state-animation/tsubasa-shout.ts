import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { tsubasaVictoryDeclaration } from "../../animation/tsubasa-victory-declaration";
import { PilotSkillTutorial01Props } from "../../props";

/** ツバサ先輩 叫び */
export const tsubasaShout: ConditionalAnimation<
  CustomStateAnimation & PilotSkillTutorial01Props
>[] = [
  (props) =>
    isEnemyPilotSkillActivated(props) ? tsubasaVictoryDeclaration(props) : null,
];
