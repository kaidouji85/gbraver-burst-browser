import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { yuuyaShout1WhenYuuyaActivateSkillToSurvive } from "../../animation/yuuya-shout1-when-yuuya-activate-skill-to-survive";
import { yuuyaShout2WhenYuuyaActivateSkillToSurvive } from "../../animation/yuuya-shout2-when-yuuya-activate-skill-to-survive";
import { ConfrontationTwoBraverProps } from "../../props";

/** 生き延びるためにユウヤがスキルを発動する カスタムステートアニメーション */
export const yuuyaActivateSkillToSurvive: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.eventState.chapter.type === "YuuyaActivateSkillToSurvive" &&
      isEnemyPilotSkillActivatedFromCurrentState(props)
      ? yuuyaShout1WhenYuuyaActivateSkillToSurvive(props)
      : null;
  },
  (props) => {
    return props.eventState.chapter.type === "YuuyaActivateSkillToSurvive" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaShout2WhenYuuyaActivateSkillToSurvive(props)
      : null;
  },
];
