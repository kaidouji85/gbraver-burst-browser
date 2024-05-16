import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";
import { updateBattleResult } from "./update-battle-result";

/**
 * プレイヤーのバッテリープラスボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPlayerBatteryPlusPush(
  props: BattleSimulatorProps,
  action: PushDOM,
) {
  const { player, playerBattery, playerElements } = props;
  const { event } = action;

  event.preventDefault();
  event.stopPropagation();

  const nextPlayerBattery = playerBattery + 1;
  if (player.armdozer.maxBattery < nextPlayerBattery) {
    return;
  }

  pop(playerElements.batteryPlus);
  props.playerBattery = nextPlayerBattery;
  updateBattery(playerElements, nextPlayerBattery);
  updateBattleResult(props);
}
