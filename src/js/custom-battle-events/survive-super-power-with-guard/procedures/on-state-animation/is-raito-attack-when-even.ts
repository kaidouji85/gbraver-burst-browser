import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { isEvenMatch } from "../../../is-even-match";

/**
 * 「raitoAttackWhenEven」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoAttackWhenEven」
 */
export function isRaitoAttackWhenEven(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, player } = props;
  const isEvent = isEvenMatch({ player, enemy });
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    isEvent
  );
}
