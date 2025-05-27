import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { StateAnimationConditionContainer } from "../../state-animation-condition";

/**
 * 「RaitoFirstAttack」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「RaitoFirstAttack」
 */
export function isRaitoFirstAttack(
  props: Readonly<CustomStateAnimationProps & StateAnimationConditionContainer>,
): boolean {
  const { currentState } = props;
  const { enemy, enemyBattleCount } = props.stateAnimationCondition;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    enemyBattleCount === 0
  );
}
