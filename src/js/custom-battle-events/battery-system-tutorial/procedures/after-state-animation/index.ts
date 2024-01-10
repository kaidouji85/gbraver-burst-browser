import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { BatterySystemTutorialProps } from "../../props";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation & BatterySystemTutorialProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimation & BatterySystemTutorialProps
  >[] = [];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
