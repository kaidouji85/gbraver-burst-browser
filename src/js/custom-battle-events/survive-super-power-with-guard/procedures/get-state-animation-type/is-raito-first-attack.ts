import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { StateAnimationTypeCondition } from "../../state-animation-type";

/**
 * 「RaitoFirstAttack」か否かを判定する
 * @param options オプション
 * @returns 判定結果、trueの場合は「RaitoFirstAttack」
 */
export function isRaitoFirstAttack(options: {
  /** カスタムステートアニメーションプロパティ */
  props: CustomStateAnimation;
  /** 条件オブジェクト */
  condition: StateAnimationTypeCondition;
}): boolean {
  const { currentState } = options.props;
  const { enemy, enemyBattleCount } = options.condition;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    enemyBattleCount === 0
  );
}
