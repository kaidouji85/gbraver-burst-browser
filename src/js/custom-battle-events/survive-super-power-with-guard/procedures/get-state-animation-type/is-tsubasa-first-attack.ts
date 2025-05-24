import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { StateAnimationTypeCondition } from "../../state-animation-type";

/**
 * 「TsubasaFirstAttack」か否かを判定する
 * @param options オプション
 * @returns 判定結果、trueの場合は「TsubasaFirstAttack」
 */
export function isTsubasaFirstAttack(options: {
  /** カスタムステートアニメーションプロパティ */
  props: CustomStateAnimationProps;
  /** 条件オブジェクト */
  condition: StateAnimationTypeCondition;
}): boolean {
  const { currentState } = options.props;
  const { player, playerBattleCount } = options.condition;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    playerBattleCount === 0
  );
}
