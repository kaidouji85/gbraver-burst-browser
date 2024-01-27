import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyPilotSkillActivated } from "../../../is-pilot-skill-activated";
import { yuuyaCry1WhenYuuyaActivateSkillToFinish } from "../../animation/yuuya-cry1-when-yuuya-activate-skill-to-finish";
import { yuuyaCry2WhenYuuyaActivateSkillToFinish } from "../../animation/yuuya-cry2-when-yuuya-activate-skill-to-finish";
import { ConfrontationTwoBraverProps } from "../../props";

/** とどめをさすためにユウヤがスキルを発動する カスタムステートアニメーション */
export const yuuyaActivateSkillToFinish: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
      isEnemyPilotSkillActivated(props)
      ? yuuyaCry1WhenYuuyaActivateSkillToFinish(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaCry2WhenYuuyaActivateSkillToFinish(props)
      : null;
  },
];
