import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { tsubasaAttack } from "./tsubasa-attack";
import { tsubasaBurst } from "./tsubasa-burst";
import { tsubasaBurstOnTraumaOfLastYear } from "./tsubasa-burst-on-trauma-of-last-year";
import { tsubasaPilotSkill } from "./tsubasa-pilot-skill";
import { yuuyaAttack } from "./yuuya-attack";
import { yuuyaAttackOnTraumaOfLastYear } from "./yuuya-attack-on-trauma-of-last-year";
import { yuuyaBurstOnTraumaOfLastYear } from "./yuuya-burst-on-trauma-of-last-year";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 */
export function onStateAnimation(
  props: CustomStateAnimation & QueenOfTragedyProps,
): Animate {
  const conditionalAnimations = [
    tsubasaPilotSkill,
    tsubasaBurstOnTraumaOfLastYear,
    tsubasaBurst,
    tsubasaAttack,
    yuuyaBurstOnTraumaOfLastYear,
    yuuyaAttackOnTraumaOfLastYear,
    yuuyaAttack,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
