import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { StateAnimationTypeCondition } from "../../state-animation-type";

/**
 * 「TsubasaDefenseTurnBurst」か否かを判定する
 * @param options オプション
 * @returns 判定結果、trueの場合は「TsubasaDefenseTurnBurst」
 */
export function isTsubasaDefenseTurnBurst(options: {
  /** カスタムステートアニメーションプロパティ */
  props: CustomStateAnimationProps;
  /** 条件オブジェクト */
  condition: StateAnimationTypeCondition;
}): boolean {
  const { currentState } = options.props;
  const { player, enemy } = options.condition;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === player.playerId &&
    currentState.activePlayerId === enemy.playerId
  );
}
