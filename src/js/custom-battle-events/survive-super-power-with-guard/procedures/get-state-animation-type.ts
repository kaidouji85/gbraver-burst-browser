import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import {
  StateAnimationType,
  StateAnimationTypeCondition,
} from "../state-animation-type";

export function getStateAnimationType(
  props: CustomStateAnimation,
  condition: StateAnimationTypeCondition,
): StateAnimationType {
  const { currentState } = props;
  const { player, playerBattleCount } = condition;

  let result: StateAnimationType = "None";
  if (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    playerBattleCount === 0
  ) {
    result = "TsubasaFirstAttack";
  }

  return result;
}
