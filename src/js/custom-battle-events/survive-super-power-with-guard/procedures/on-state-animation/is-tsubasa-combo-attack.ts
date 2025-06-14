import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「tsubasaComboAttack」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaComboAttack」
 */
export function isTsubasaComboAttack(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player, isContinuousActive } = props;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    isContinuousActive
  );
}
