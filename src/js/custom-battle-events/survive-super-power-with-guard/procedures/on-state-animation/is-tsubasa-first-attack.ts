import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「tsubasaFirstAttack」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaFirstAttack」
 */
export function isTsubasaFirstAttack(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, player, playerMainTurnCount } = props;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    playerMainTurnCount === 1
  );
}
