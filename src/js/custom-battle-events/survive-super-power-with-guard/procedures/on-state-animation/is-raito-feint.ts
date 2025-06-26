import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoFeint」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoFeint」
 */
export function isRaitoFeint(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy } = props;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    currentState.effect.attackerBattery === 0
  );
}
