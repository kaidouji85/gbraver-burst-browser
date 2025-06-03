import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「tsubasaDefenseTurnBurst」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaDefenseTurnBurst」
 */
export function isTsubasaDefenseTurnBurst(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player, enemy } = props;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === player.playerId &&
    currentState.activePlayerId === enemy.playerId
  );
}
