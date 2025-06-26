import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiBattleShoutWhenHit } from "../../animation/gai-battle-shout-when-hit";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ 戦闘 ヒット */
export const gaiBattleWhenHit: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { update, currentState, enemyId } = props;
  const { effect } = currentState;
  const hasEnemyGuard = update.some(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === enemyId &&
      s.effect.result.name === "NormalHit",
  );
  if (
    hasEnemyGuard &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiBattleShoutWhenHit(props);
  } else if (
    hasEnemyGuard &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
