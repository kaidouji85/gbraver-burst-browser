import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { isPlayerAdvantage } from "../../../is-player-advantage";

/**
 * 「raitoAttackWhenAdvantage」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoAttackWhenAdvantage」
 */
export function isRaitoAttackWhenAdvantage(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, player } = props;
  const isEnemyAdvantage = !isPlayerAdvantage({ player, enemy });
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    isEnemyAdvantage
  );
}
