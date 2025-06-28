import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoSecondAttack1」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoSecondAttack1」
 */
export function isRaitoSecondAttack1(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, enemyMainTurnCount } = props;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    enemyMainTurnCount === 2
  );
}

/**
 * 「raitoSecondAttack2」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoSecondAttack2」
 */
export function isRaitoSecondAttack2(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, enemyMainTurnCount } = props;
  return (
    currentState.effect.name === "Battle" &&
    currentState.effect.attacker === enemy.playerId &&
    enemyMainTurnCount === 2
  );
}
