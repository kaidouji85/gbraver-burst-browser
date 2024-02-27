import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
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
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & PilotSkillTutorial01Props>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimation & PilotSkillTutorial01Props
  >[] = [
    ...tsubasaShout,
    ...shinyaShout,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
