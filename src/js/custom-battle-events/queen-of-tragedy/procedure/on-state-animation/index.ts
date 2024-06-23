import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { tsubasaAttackWhenContinuousAttack } from "./tsubasa-attack-when-continuous-attack";
import { tsubasaBurst } from "./tsubasa-burst";
import { tsubasaBurstWhenTraumaOfLastYear } from "./tsubasa-burst-when-trauma-of-last-year";
import { tsubasaFeintFail } from "./tsubasa-feint-fail";
import { tsubasaFeintSuccess } from "./tsubasa-feint-success";
import { tsubasaFirstAttack } from "./tsubasa-first-attack";
import { tsubasaPilotSkill } from "./tsubasa-pilot-skill";
import { yuuyaAttack } from "./yuuya-attack";
import { yuuyaAttackWhenTraumaOfLastYear } from "./yuuya-attack-when-trauma-of-last-year";
import { yuuyaBurst } from "./yuuya-burst";
import { yuuyaBurstWhenTraumaOfLastYear } from "./yuuya-burst-when-trauma-of-last-year";
import { yuuyaFinish } from "./yuuya-finish";
import { yuuyaPilotSkill } from "./yuuya-pilot-skill";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 */
export function onStateAnimation(
  props: CustomStateAnimation & QueenOfTragedyProps,
): Animate {
  const conditionalAnimations = [
    tsubasaPilotSkill,
    tsubasaBurstWhenTraumaOfLastYear,
    tsubasaBurst,
    tsubasaFirstAttack,
    tsubasaFeintSuccess,
    tsubasaFeintFail,
    tsubasaAttackWhenContinuousAttack,
    yuuyaFinish,
    yuuyaBurstWhenTraumaOfLastYear,
    yuuyaBurst,
    yuuyaAttackWhenTraumaOfLastYear,
    yuuyaAttack,
    yuuyaPilotSkill,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
