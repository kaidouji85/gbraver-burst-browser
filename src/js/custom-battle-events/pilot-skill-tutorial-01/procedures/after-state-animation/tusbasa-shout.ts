import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { PilotSkillTutorial01Props } from "../../props";

/** ツバサ先輩 叫び */
export const tsubasaShout: ConditionalAnimation<
  CustomStateAnimation & PilotSkillTutorial01Props
>[] = [
  (props) =>
    isEnemyPilotSkillActivated(props)
      ? onStart(() => {
          props.view.dom.enemyShoutMessageWindow.visible(false);
        })
      : null,
];
