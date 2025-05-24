import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { getAnimationIfConditionMet } from "../../../get-animation-if-conditional-met";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { PrinceOfFallenSunProps } from "../../props";
import { gaiBattleWhenGuard } from "./gai-battle-when-guard";
import { gaiBattleWhenMiss } from "./gai-battle-when-miss";
import { gaiBurst } from "./gai-burst";
import { gaiFeintSuccess } from "./gai-feint-success";
import { gaiFinish } from "./gai-finish";
import { gaiFirstAttack } from "./gai-first-attack";
import { gaiPilotSkill } from "./gai-pilot-skill";
import { gaiSecondAttack } from "./gai-second-attack";
import { yuuyaBattleWhenFeint } from "./yuuya-battle-when-feint";
import { yuuyaBattleWhenGuard } from "./yuuya-battle-when-guard";
import { yuuyaBattleWhenMiss } from "./yuuya-battle-when-miss";
import { yuuyaBattleWhenNormalHit } from "./yuuya-battle-when-normal-hit";
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
  props: CustomStateAnimationProps & PrinceOfFallenSunProps,
): Animate {
  const conditionalAnimations = [
    yuuyaFinish,
    yuuyaFirstAttack,
    yuuyaSecondAttack,
    yuuyaBurstWhenGaiActivatedSkill,
    yuuyaBurstWhenOneTurn,
    yuuyaBurst,
    yuuyaPilotSkill,
    yuuyaBattleWhenNormalHit,
    yuuyaBattleWhenGuard,
    yuuyaBattleWhenMiss,
    yuuyaBattleWhenFeint,
    gaiPilotSkill,
    gaiBurst,
    gaiFinish,
    gaiFeintSuccess,
    gaiFirstAttack,
    gaiSecondAttack,
    gaiBattleWhenGuard,
    gaiBattleWhenMiss,
    invisibleShoutMessageWindowWhenTurnChange,
  ];
  return getAnimationIfConditionMet(props, conditionalAnimations) ?? empty();
}
