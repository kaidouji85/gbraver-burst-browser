import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation, getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { BurstTutorialProps } from "../../props";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & BurstTutorialProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimation & BurstTutorialProps
  >[] = [];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
