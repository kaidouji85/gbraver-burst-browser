import { GameState } from "gbraver-burst-core";

import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiBattleShoutWhenFirstGuard } from "../../animation/gai-battle-shout-when-first-guard";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ 戦闘 ガード1回目 */
export const gaiBattleWhenFirstGuard: ConditionalAnimation<
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

  if (
    hasEnemyGuard &&
    enemyGuardCount === 1 &&
    effect.name === "BatteryDeclaration" &&
    effect.attacker === enemyId
  ) {
    result = gaiBattleShoutWhenFirstGuard(props);
  } else if (
    hasEnemyGuard &&
    enemyGuardCount === 1 &&
    effect.name === "Battle" &&
    effect.attacker === enemyId
  ) {
    result = empty();
  }

  return result;
};
