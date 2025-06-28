import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { hasDeliveredFinishBlow } from "../../../has-delivered-finish-blow";

/**
 * 「tsubasaFinishBlow」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「tsubasaFinishBlow」
 */
export function isTsubasaFinishBlow(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { update, currentState, player } = props;
  const hasPlayerFinishBlow = hasDeliveredFinishBlow(update, player.playerId);
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === player.playerId &&
    hasPlayerFinishBlow
  );
}
