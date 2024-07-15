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
import { tsubasaFourthAttack } from "./tsubasa-fourth-attack";
import { tsubasaPilotSkill } from "./tsubasa-pilot-skill";
import { tsubasaFinish } from "./tusbasa-finish";
import { yuuyaAttackWhenTraumaOfLastYear } from "./yuuya-attack-when-trauma-of-last-year";
import { yuuyaBurst } from "./yuuya-burst";
import { yuuyaBurstWhenTraumaOfLastYear } from "./yuuya-burst-when-trauma-of-last-year";
import { yuuyaFinish } from "./yuuya-finish";
import { yuuyaFirstAttack } from "./yuuya-first-attack";
import { yuuyaPilotSkill } from "./yuuya-pilot-skill";
import { yuuyaSecondAttack } from "./yuuya-second-attack";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 */
export function onStateAnimation(
  props: CustomStateAnimation & QueenOfTragedyProps,
): Animate {
  const conditionalAnimations = [
    tsubasaFinish,
    tsubasaPilotSkill,
    tsubasaBurstWhenTraumaOfLastYear,
    tsubasaBurst,
    tsubasaFeintSuccess,
    tsubasaFeintFail,
    tsubasaAttackWhenContinuousAttack,
    tsubasaFirstAttack,
    tsubasaFourthAttack,
    yuuyaFinish,
    yuuyaBurstWhenTraumaOfLastYear,
    yuuyaBurst,
    yuuyaAttackWhenTraumaOfLastYear,
    yuuyaFirstAttack,
    yuuyaSecondAttack,
    yuuyaPilotSkill,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
