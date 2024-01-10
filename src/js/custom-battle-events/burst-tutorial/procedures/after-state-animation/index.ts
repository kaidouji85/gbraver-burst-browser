import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { BurstTutorialProps } from "../../props";
import { shinyaBurst } from "./shinya-burst";

/**
 * ステートアニメ終了後に呼ばれるアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation & BurstTutorialProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimation & BurstTutorialProps
  >[] = [...shinyaBurst];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
