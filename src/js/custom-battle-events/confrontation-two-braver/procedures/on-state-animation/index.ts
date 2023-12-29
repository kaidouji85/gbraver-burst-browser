import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { ConfrontationTwoBraverProps } from "../../props";
import { evenMatch } from "./even-match";
import { shinyaBurst } from "./shinya-burst";
import { shinyaFirstBattle } from "./shinya-first-battle";
import { shinyaHasAdvantage } from "./shinya-has-advantage";
import { shinyaPilotSkill } from "./shinya-pilot-skill";
import { yuuyaActivateSkillToFinish } from "./yuuya-activate-skill-to-finish";
import { yuuyaActivateSkillToSurvive } from "./yuuya-activate-skill-to-survive";
import { yuuyaFirstBattle } from "./yuuya-first-battle";
import { yuuyaHasAdvantage } from "./yuuya-has-advantage";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & ConfrontationTwoBraverProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimation & ConfrontationTwoBraverProps
  >[] = [
    ...shinyaHasAdvantage,
    ...yuuyaHasAdvantage,
    ...evenMatch,
    ...yuuyaActivateSkillToSurvive,
    ...yuuyaActivateSkillToFinish,
    ...shinyaPilotSkill,
    ...shinyaBurst,
    ...shinyaFirstBattle,
    ...yuuyaFirstBattle,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
