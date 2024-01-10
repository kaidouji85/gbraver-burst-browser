import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { BatterySystemTutorialProps } from "../../props";
import { shinyaBurst } from "./shinya-burst";
import { shinyaPilotSkill } from "./shinya-pilot-skill";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & BatterySystemTutorialProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimation & BatterySystemTutorialProps
  >[] = [
    ...shinyaBurst,
    ...shinyaPilotSkill,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
