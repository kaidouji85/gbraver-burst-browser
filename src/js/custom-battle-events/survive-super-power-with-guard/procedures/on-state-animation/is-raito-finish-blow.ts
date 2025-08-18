import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";

/**
 * 「raitoFinishShout」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoFinishShout」
 */
export function isRaitoFinishBlow(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, update } = props;
  const hasEnemyFinishBlow = hasDeliveredFinishBlow(update, enemy.playerId);
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    hasEnemyFinishBlow
  );
}
