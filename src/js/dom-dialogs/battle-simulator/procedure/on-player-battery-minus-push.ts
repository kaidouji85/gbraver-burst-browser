import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";

/**
 * プレイヤーのバッテリーマイナスボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPlayerBatteryMinusPush(
  props: BattleSimulatorProps,
  action: PushDOM,
) {
  const { playerBattery, playerElements } = props;
  const { event } = action;

  event.preventDefault();
  event.stopPropagation();

  const nextPlayerBattery = playerBattery - 1;
  if (nextPlayerBattery < 0) {
    return;
  }

  pop(playerElements.batteryMinus);
  props.playerBattery = nextPlayerBattery;
  updateBattery(playerElements, nextPlayerBattery);
}
