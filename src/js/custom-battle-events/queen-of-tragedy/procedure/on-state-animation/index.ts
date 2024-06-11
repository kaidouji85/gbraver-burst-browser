import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { tsubasaAttack } from "./tsubasa-attack";
import { tsubasaBurst } from "./tsubasa-burst";
import { tsubasaBurstWhenTraumaOfLastYear } from "./tsubasa-burst-when-trauma-of-last-year";
import { tsubasaPilotSkill } from "./tsubasa-pilot-skill";
import { yuuyaAttack } from "./yuuya-attack";
import { yuuyaAttackWhenTraumaOfLastYear } from "./yuuya-attack-when-trauma-of-last-year";
import { yuuyaBurst } from "./yuuya-burst";
import { yuuyaBurstWhenTraumaOfLastYear } from "./yuuya-burst-when-trauma-of-last-year";

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
    tsubasaAttack,
    yuuyaBurstWhenTraumaOfLastYear,
    yuuyaBurst,
    yuuyaAttackWhenTraumaOfLastYear,
    yuuyaAttack,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
