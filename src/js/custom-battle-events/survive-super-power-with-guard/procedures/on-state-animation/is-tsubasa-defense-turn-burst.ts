import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { StateAnimationConditionContainer } from "../../state-animation-condition";

/**
 * 「TsubasaDefenseTurnBurst」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「TsubasaDefenseTurnBurst」
 */
export function isTsubasaDefenseTurnBurst(
  props: Readonly<CustomStateAnimationProps & StateAnimationConditionContainer>,
): boolean {
  const { currentState } = props;
  const { player, enemy } = props.stateAnimationCondition;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === player.playerId &&
    currentState.activePlayerId === enemy.playerId
  );
}
