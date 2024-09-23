import { GameState } from "gbraver-burst-core";

import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiBattleShoutWhenGuardAndEnemyDamaged } from "../../animation/gai-battle-shout-when-guard-and-enemy-damaged";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ 戦闘 ガード2回目 */
export const gaiBattleWhenSecondGuard: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { update, stateHistory, currentState, enemyId } = props;
  const { effect } = currentState;
  const isEnemyGuard = (s: GameState) =>
    s.effect.name === "Battle" &&
    s.effect.attacker === enemyId &&
    s.effect.result.name === "Guard";
  const hasEnemyGuard = update.some(isEnemyGuard);
  const enemyGuardCount = stateHistory.filter(isEnemyGuard).length;
  const isEnemySecondGuard = hasEnemyGuard && enemyGuardCount === 2;

  if (
    isEnemySecondGuard &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiBattleShoutWhenGuardAndEnemyDamaged(props);
  } else if (
    isEnemySecondGuard &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
