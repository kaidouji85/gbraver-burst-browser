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
import { gaiSecondAttack } from "./gai-second-attack";
import { yuuyaAttackWhenGuard } from "./yuuya-attack-when-guard";
import { yuuyaAttackWhenNormalHit } from "./yuuya-attack-when-normal-hit";
import { yuuyaBurst } from "./yuuya-burst";
import { yuuyaBurstWhenGaiActivatedSkill } from "./yuuya-burst-when-gai-activated-skill";
import { yuuyaBurstWhenOneTurn } from "./yuuya-burst-when-one-turn";
import { yuuyaFinish } from "./yuuya-finish";
import { yuuyaFirstAttack } from "./yuuya-first-attack";
import { yuuyaPilotSkill } from "./yuuya-pilot-skill";
import { yuuyaSecondAttack } from "./yuuya-second-attack";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: CustomStateAnimation & PrinceOfFallenSunProps,
): Animate {
  const conditionalAnimations = [
    yuuyaFinish,
    yuuyaFirstAttack,
    yuuyaSecondAttack,
    yuuyaBurstWhenGaiActivatedSkill,
    yuuyaBurstWhenOneTurn,
    yuuyaBurst,
    yuuyaPilotSkill,
    yuuyaAttackWhenNormalHit,
    yuuyaAttackWhenGuard,
    gaiPilotSkill,
    gaiBurst,
    gaiFinish,
    gaiFeintSuccess,
    gaiFirstAttack,
    gaiSecondAttack,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
