import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「tsubasaAttackTurnBurst」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaAttackTurnBurst」
 */
export function isTsubasaAttackTurnBurst(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player } = props;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === player.playerId &&
    currentState.activePlayerId === player.playerId
  );
}
