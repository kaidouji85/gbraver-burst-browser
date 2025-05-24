import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { ConfrontationTwoBraverProps } from "../../props";
import { evenMatch } from "./even-match";
import { shinyaHasAdvantage } from "./shinya-has-advantage";
import { yuuyaActivateSkillToSurvive } from "./yuuya-activate-skill-to-survive";
import { yuuyaHasAdvantage } from "./yuuya-has-advantage";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns カスタムステートアニメーション
 */
export function afterStateAnimation(
  props: Readonly<CustomStateAnimationProps & ConfrontationTwoBraverProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimationProps & ConfrontationTwoBraverProps
  >[] = [
    ...shinyaHasAdvantage,
    ...yuuyaHasAdvantage,
    ...evenMatch,
    ...yuuyaActivateSkillToSurvive,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
