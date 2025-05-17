import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { tsubasaFirstAttackShout } from "../animation/tsubasa-first-attack-shout";
import { StateAnimationConditions } from "../state-animation-conditions";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns カスタムステートアニメーション
 */
export function onStateAnimation(
  props: CustomStateAnimation & {
    stateAnimationCondition: StateAnimationConditions;
  },
): Animate {
  const { currentState } = props;
  const { player, playerBattleCount } = props.stateAnimationCondition;

  if (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    playerBattleCount === 0
  ) {
    return tsubasaFirstAttackShout(props);
  }

  return empty();
}
