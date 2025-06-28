import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「tsubasaFeint」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaFeint」
 */
export function isTsubasaFeint(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player } = props;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    currentState.effect.attackerBattery === 0
  );
}
