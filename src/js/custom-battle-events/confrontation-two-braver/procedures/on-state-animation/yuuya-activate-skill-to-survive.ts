import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { yuuyaCry1WhenYuuyaActivateSkillToSurvive } from "../../animation/yuuya-cry1-when-yuuya-activate-skill-to-survive";
import { yuuyaCry2WhenYuuyaActivateSkillToSurvive } from "../../animation/yuuya-cry2-when-yuuya-activate-skill-to-survive";
import { ConfrontationTwoBraverProps } from "../../props";

/** 生き延びるためにユウヤがスキルを発動する カスタムステートアニメーション */
export const yuuyaActivateSkillToSurvive: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "YuuyaActivateSkillToSurvive" &&
      isEnemyPilotSkillActivated(props)
      ? yuuyaCry1WhenYuuyaActivateSkillToSurvive(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "YuuyaActivateSkillToSurvive" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaCry2WhenYuuyaActivateSkillToSurvive(props)
      : null;
  },
];
