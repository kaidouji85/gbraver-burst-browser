import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { ConfrontationTwoBraverProps } from "../../props";
import { evenMatch } from "./even-match";
import { shinyaFirstBattle } from "./shinya-first-battle";
import { shinyaHasAdvantage } from "./shinya-has-advantage";
import { shinyaBurst } from "./sinya-burst";
import { shinyaPilotSkill } from "./sinya-pilot-skill";
import { yuuyaActivateSkillToFinish } from "./yuuya-activate-skill-to-finish";
import { yuuyaActivateSkillToSurvive } from "./yuuya-activate-skill-to-survive";
import { yuuyaFinishBlow } from "./yuuya-finish-blow";
import { yuuyaFirstBattle } from "./yuuya-first-battle";
import { yuuyaHasAdvantage } from "./yuuya-has-advantage";

/**
 * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
 * @param props イベントプロパティ
 * @return カスタムステートアニメーション
 */
export function afterStateAnimation(
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
    ...shinyaFirstBattle,
    ...shinyaPilotSkill,
    ...shinyaBurst,
    ...yuuyaFirstBattle,
    ...yuuyaFinishBlow,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
