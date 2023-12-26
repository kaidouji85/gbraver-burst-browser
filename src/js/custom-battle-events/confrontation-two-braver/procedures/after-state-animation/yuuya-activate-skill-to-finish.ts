import { process } from "../../../../animation/process";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { ConfrontationTwoBraverProps } from "../../props";

/** とどめをさすためにユウヤがスキルを発動する カスタムステートアニメ終了 */
export const yuuyaActivateSkillToFinish: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? process(() => {
          props.view.dom.enemyCryMessageWindow.visible(false);
        })
      : null;
  },
];
