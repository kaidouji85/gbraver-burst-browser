import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { PrinceOfFallenSunProps } from "../../props";
import { gaiBurst } from "./gai-burst";
import { gaiFeintSuccess } from "./gai-feint-success";
import { gaiFinish } from "./gai-finish";
import { gaiFirstAttack } from "./gai-first-attack";
import { gaiPilotSkill } from "./gai-pilot-skill";
import { yuuyaBurstWhenGaiActivatedSkill } from "./yuuya-burst-when-gai-activated-skill";
import { yuuyaBurstWhenOneTurn } from "./yuuya-burst-when-one-turn";
import { yuuyaFeintWhenFirstBattle } from "./yuuya-feint-when-first-battle";
import { yuuyaFirstAttack } from "./yuuya-first-attack";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: CustomStateAnimation & PrinceOfFallenSunProps,
): Animate {
  const conditionalAnimations = [
    yuuyaFeintWhenFirstBattle,
    yuuyaFirstAttack,
    yuuyaBurstWhenGaiActivatedSkill,
    yuuyaBurstWhenOneTurn,
    gaiFirstAttack,
    gaiPilotSkill,
    gaiBurst,
    gaiFinish,
    gaiFeintSuccess,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
