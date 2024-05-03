import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { PilotSkillTutorial02Props } from "../../props";
import { gaiShout } from "./gai-shout";
import { tsubasaShout } from "./tsubasa-shout";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & PilotSkillTutorial02Props>,
): Animate {
  const conditionalAnimations = [
    ...gaiShout,
    ...tsubasaShout,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
