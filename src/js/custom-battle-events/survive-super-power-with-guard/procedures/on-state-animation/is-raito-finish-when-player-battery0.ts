import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";

/**
 * 「raitoFinishShoutWhenPlayerBattery0」か否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueの場合は「raitoFinishShoutWhenPlayerBattery0」
 */
export function isRaitoFinishWhenPlayerBattery0(
  props: Readonly<CustomStateAnimationProps>,
): boolean {
  const { currentState, enemy, player } = props;
  return (
    currentState.effect.name === "BatteryDeclaration" &&
    currentState.effect.attacker === enemy.playerId &&
    player.armdozer.battery === 0
  );
}
