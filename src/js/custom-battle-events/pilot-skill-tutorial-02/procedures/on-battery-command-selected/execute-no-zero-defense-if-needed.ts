import { BatteryCommandSelectedEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { noZeroDefense } from "../../stories/no-zero-defense";

/**
 * 条件を満たした場合「0防御しない」を再生する
 * @param props イベントプロパティ
 * @returns 再生した否か、trueで再生した
 */
export async function executeNoZeroDefenseIfNeeded(
  props: Readonly<BatteryCommandSelectedEventProps>,
): Promise<boolean> {
  const { lastState } = props;
  const player = lastState.players.find((p) => p.playerId === props.playerId);
  if (player === undefined) {
    return false;
  }

  const isEnemyTurn = lastState.activePlayerId !== props.playerId;
  if (
    props.battery.battery <= 0 &&
    isEnemyTurn &&
    0 < player.armdozer.battery
  ) {
    props.view.hud.gameObjects.batterySelector.pushBatteryAdjustButtonsSilently(
      1,
    );
    await noZeroDefense(props);
    return true;
  }

  return false;
}
