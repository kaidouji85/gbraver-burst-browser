import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoBurst」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoBurst」
 */
export function isRaitoBurst(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy } = props;
  return (
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === enemy.playerId
  );
}
