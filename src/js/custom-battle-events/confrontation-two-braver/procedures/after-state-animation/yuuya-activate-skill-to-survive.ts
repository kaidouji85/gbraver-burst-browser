import { onStart } from "../../../../animation/on-start";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { ConfrontationTwoBraverProps } from "../../props";

/** 生き延びるためにユウヤがスキルを発動する カスタムステートアニメ終了 */
export const yuuyaActivateSkillToSurvive: ConditionalAnimation<
  CustomStateAnimationProps & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.eventState.chapter.type === "YuuyaActivateSkillToSurvive" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? onStart(() => {
          props.view.dom.enemyShoutMessageWindow.visible(false);
        })
      : null;
  },
];
