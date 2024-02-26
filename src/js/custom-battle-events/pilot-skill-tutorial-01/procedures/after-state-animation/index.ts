import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation, getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { PilotSkillTutorial01Props } from "../../props";
import { tsubasaShout } from "./tusbasa-shout";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimation & PilotSkillTutorial01Props>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimation & PilotSkillTutorial01Props
  >[] = [
    ...tsubasaShout,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
