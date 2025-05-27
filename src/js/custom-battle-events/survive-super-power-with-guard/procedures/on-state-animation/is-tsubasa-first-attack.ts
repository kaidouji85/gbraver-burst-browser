import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { StateAnimationConditionContainer } from "../../state-animation-condition";

/**
 * 「TsubasaFirstAttack」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「TsubasaFirstAttack」
 */
export function isTsubasaFirstAttack(
  props: Readonly<CustomStateAnimationProps & StateAnimationConditionContainer>,
): boolean {
  const { currentState } = props;
  const { player, playerBattleCount } = props.stateAnimationCondition;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    playerBattleCount === 0
  );
}
