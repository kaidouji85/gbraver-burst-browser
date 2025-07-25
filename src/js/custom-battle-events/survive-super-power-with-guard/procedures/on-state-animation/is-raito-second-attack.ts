import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoSecondAttack」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoSecondAttack」
 */
export function isRaitoSecondAttack(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, enemyMainTurnCount } = props;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    enemyMainTurnCount === 2
  );
}
