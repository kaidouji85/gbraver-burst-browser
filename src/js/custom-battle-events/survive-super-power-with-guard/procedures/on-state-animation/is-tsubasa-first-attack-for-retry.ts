import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「TsubasaFirstAttackForRetry」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「TsubasaFirstAttackForRetry」
 */
export function isTsubasaFirstAttackForRetry(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player, playerMainTurnCount, isRetry } = props;
  return (
    isRetry &&
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    0 < currentState.effect.attackerBattery &&
    playerMainTurnCount === 1
  );
}
