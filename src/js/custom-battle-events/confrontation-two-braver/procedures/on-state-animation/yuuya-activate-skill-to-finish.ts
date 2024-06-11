import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { yuuyaShout1WhenYuuyaActivateSkillToFinish } from "../../animation/yuuya-shout1-when-yuuya-activate-skill-to-finish";
import { yuuyaShout2WhenYuuyaActivateSkillToFinish } from "../../animation/yuuya-shout2-when-yuuya-activate-skill-to-finish";
import { ConfrontationTwoBraverProps } from "../../props";

/** とどめをさすためにユウヤがスキルを発動する カスタムステートアニメーション */
export const yuuyaActivateSkillToFinish: ConditionalAnimation<
  CustomStateAnimation & ConfrontationTwoBraverProps
>[] = [
  (props) => {
    return props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
      isEnemyPilotSkillActivatedFromCurrentState(props)
      ? yuuyaShout1WhenYuuyaActivateSkillToFinish(props)
      : null;
  },
  (props) => {
    return props.state.chapter.type === "YuuyaActivateSkillToFinish" &&
      props.currentState.effect.name === "BatteryDeclaration"
      ? yuuyaShout2WhenYuuyaActivateSkillToFinish(props)
      : null;
  },
];
