import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiBattleShoutWhenMiss } from "../../animation/gai-battle-shout-when-miss";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ 戦闘 ミス */
export const gaiBattleWhenMiss: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { update, currentState, enemyId } = props;
  const { effect } = currentState;
  const hasEnemyMiss = update.some(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.attacker === enemyId &&
      s.effect.result.name === "Miss",
  );

  if (
    hasEnemyMiss &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiBattleShoutWhenMiss(props);
  } else if (
    hasEnemyMiss &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
