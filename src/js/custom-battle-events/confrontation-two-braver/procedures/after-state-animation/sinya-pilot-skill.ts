import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { ConfrontationTwoBraverProps } from "../../props";

/** シンヤ パイロットスキル発動 カスタムステートアニメ終了 */
export const sinyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return isPlayerPilotSkillActivated(props)
      ? process(() => {
          props.view.dom.playerCryMessageWindow.visible(false);
        })
      : null;
  },
];
