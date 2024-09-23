import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiBattleShoutWhenMinimalBatteryAvoid } from "../../animation/gai-battle-shout-when-minimal-battery-avoid";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ 戦闘 ミス */
export const gaiBattleWhenMiss: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
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
    result = gaiBattleShoutWhenMinimalBatteryAvoid(props);
  } else if (
    hasEnemyMiss &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
