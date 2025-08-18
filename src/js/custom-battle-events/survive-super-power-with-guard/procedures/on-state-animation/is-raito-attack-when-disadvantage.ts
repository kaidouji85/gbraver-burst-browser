import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { isPlayerAdvantage } from "../../../is-player-advantage";

/**
 * 「raitoAttackWhenDisadvantage」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoAttackWhenDisadvantage」
 */
export function isRaitoAttackWhenDisadvantage(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, player } = props;
  const isRaitoDisadvantage = isPlayerAdvantage({ player, enemy });
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    isRaitoDisadvantage
  );
}
