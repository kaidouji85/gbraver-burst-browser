import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import {
  ConditionalAnimation,
  getAnimationIfConditionMet,
} from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { ConfrontationTwoBraverProps } from "../../props";
import { evenMatch } from "./even-match";
import { shinyaBattleWhenYuuyaHPIsFull } from "./shinya-battle-when-yuuya-hp-is-full";
import { shinyaBattleWhenYuuyaTakesDamage } from "./shinya-battle-when-yuuya-takes-damage";
import { shinyaBurst } from "./shinya-burst";
import { shinyaFirstBattle } from "./shinya-first-battle";
import { shinyaHasAdvantage } from "./shinya-has-advantage";
import { shinyaPilotSkill } from "./shinya-pilot-skill";
import { yuuyaActivateSkillToFinish } from "./yuuya-activate-skill-to-finish";
import { yuuyaActivateSkillToSurvive } from "./yuuya-activate-skill-to-survive";
import { yuuyaBattleWhenShinyaHPIsFull } from "./yuuya-battle-when-shinya-hp-is-full";
import { yuuyaBattleWhenZeroAttack } from "./yuuya-battle-when-zero-attack";
import { yuuyaFinishBlow } from "./yuuya-finish-blow";
import { yuuyaFirstBattle } from "./yuuya-first-battle";
import { yuuyaHasAdvantage } from "./yuuya-has-advantage";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimationProps & ConfrontationTwoBraverProps>,
): Animate {
  const conditionalAnimations: ConditionalAnimation<
    CustomStateAnimationProps & ConfrontationTwoBraverProps
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
    ...yuuyaFinishBlow,
    ...shinyaBattleWhenYuuyaHPIsFull,
    ...shinyaBattleWhenYuuyaTakesDamage,
    ...yuuyaBattleWhenShinyaHPIsFull,
    ...yuuyaBattleWhenZeroAttack,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
