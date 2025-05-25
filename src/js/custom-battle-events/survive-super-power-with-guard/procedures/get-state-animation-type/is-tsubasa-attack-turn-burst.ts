import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { StateAnimationTypeCondition } from "../../state-animation-type";

/**
 * 「TsubasaAttackTurnBurst」か否かを判定する
 * @param options オプション
 * @returns 判定結果、trueの場合は「TsubasaAttackTurnBurst」
 */
export function isTsubasaAttackTurnBurst(options: {
  /** カスタムステートアニメーションプロパティ */
  props: CustomStateAnimationProps;
  /** 条件オブジェクト */
  condition: StateAnimationTypeCondition;
}): boolean {
  const { currentState } = options.props;
  const { player } = options.condition;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === player.playerId &&
    currentState.activePlayerId === player.playerId
  );
}
