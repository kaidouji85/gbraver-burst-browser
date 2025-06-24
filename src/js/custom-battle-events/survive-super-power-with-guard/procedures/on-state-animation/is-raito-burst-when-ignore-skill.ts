import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoBurstWhenIgnoreSkill」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoBurstWhenIgnoreSkill」
 */
export function isRaitoBurstWhenIgnoreSkill(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, player, stateHistoryUntilNow } = props;
  const hadPlayerBatteryCorrection =
    stateHistoryUntilNow
      .at(-2)
      ?.players.find((p) => p.playerId === player.playerId)
      ?.armdozer.effects.some((e) => e.type === "BatteryCorrection") ?? false;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === enemy.playerId &&
    hadPlayerBatteryCorrection
  );
}
