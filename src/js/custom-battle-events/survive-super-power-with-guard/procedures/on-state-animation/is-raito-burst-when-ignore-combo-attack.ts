import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoBurstWhenIgnoreComboAttack」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoBurstWhenIgnoreComboAttack」
 */
export function isRaitoBurstWhenIgnoreComboAttack(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, player, stateHistoryUntilNow } = props;
  const hadPlayerComboAttack =
    stateHistoryUntilNow
      .at(-2)
      ?.players.find((p) => p.playerId === player.playerId)
      ?.armdozer.effects.some((e) => e.type === "ContinuousActivePlayer") ??
    false;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === enemy.playerId &&
    hadPlayerComboAttack
  );
}
