import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「TsubasaFeintOnFirstAttackForRetry」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「TsubasaFeintOnFirstAttackForRetry」
 */
export function isTsubasaFeintOnFirstAttackForRetry(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player, playerMainTurnCount, isRetry } = props;
  return (
    isRetry &&
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    currentState.effect.attackerBattery === 0 &&
    playerMainTurnCount === 1
  );
}
