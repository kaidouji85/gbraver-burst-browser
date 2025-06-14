import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { PilotSkillTutorial01Props } from "../../props";
import { shinyaShout } from "./shinya-shout";
import { tsubasaShout } from "./tsubasa-shout";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimationProps & PilotSkillTutorial01Props>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimationProps & PilotSkillTutorial01Props
  >[] = [
    ...tsubasaShout,
    ...shinyaShout,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
