import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { ZeroDefenseTutorialProps } from "../../props";
import { shinyaBurst } from "./shinya-burst";
import { shinyaPilotSkill } from "./shinya-pilot-skill";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimationProps & ZeroDefenseTutorialProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimationProps & ZeroDefenseTutorialProps
  >[] = [...shinyaBurst, ...shinyaPilotSkill];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
