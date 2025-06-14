import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { tsubasaAttackWhenContinuousAttack } from "./tsubasa-attack-when-continuous-attack";
import { tsubasaAttackWhenEvenMatch } from "./tsubasa-attack-when-even-match";
import { tsubasaAttackWhenSheHadAdvantage } from "./tsubasa-attack-when-she-had-advantage";
import { tsubasaAttackWhenSheHadDisadvantage } from "./tsubasa-attack-when-she-had-disadvantage";
import { tsubasaBurst } from "./tsubasa-burst";
import { tsubasaBurstWhenTraumaOfLastYear } from "./tsubasa-burst-when-trauma-of-last-year";
import { tsubasaFeintFail } from "./tsubasa-feint-fail";
import { tsubasaFeintSuccess } from "./tsubasa-feint-success";
import { tsubasaFirstAttack } from "./tsubasa-first-attack";
import { tsubasaFourthAttack } from "./tsubasa-fourth-attack";
import { tsubasaPilotSkill } from "./tsubasa-pilot-skill";
import { tsubasaFinish } from "./tusbasa-finish";
import { yuuyaAttackWhenEvenMatch } from "./yuuya-attack-when-even-match";
import { yuuyaAttackWhenHeHasAdvantage } from "./yuuya-attack-when-he-has-advantage";
import { yuuyaAttackWhenHeHasDisadvantage } from "./yuuya-attack-when-he-has-disadvantage";
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
 * @returns アニメーション
 */
export function onStateAnimation(
  props: CustomStateAnimationProps & QueenOfTragedyProps,
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
    tsubasaAttackWhenSheHadAdvantage,
    tsubasaAttackWhenEvenMatch,
    tsubasaAttackWhenSheHadDisadvantage,
    yuuyaFinish,
    yuuyaBurstWhenTraumaOfLastYear,
    yuuyaBurst,
    yuuyaAttackWhenTraumaOfLastYear,
    yuuyaFirstAttack,
    yuuyaSecondAttack,
    yuuyaPilotSkill,
    yuuyaAttackWhenHeHasAdvantage,
    yuuyaAttackWhenEvenMatch,
    yuuyaAttackWhenHeHasDisadvantage,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
