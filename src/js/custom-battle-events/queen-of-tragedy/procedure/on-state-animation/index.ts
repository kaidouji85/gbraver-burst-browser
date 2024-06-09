import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { tsubasaAttack } from "./tsubasa-attack";
import { tsubasaPilotSkill } from "./tsubasa-pilot-skill";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 */
export function onStateAnimation(
  props: CustomStateAnimation & QueenOfTragedyProps,
): Animate {
  const conditionalAnimations = [
    ...tsubasaPilotSkill,
    ...tsubasaAttack,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
