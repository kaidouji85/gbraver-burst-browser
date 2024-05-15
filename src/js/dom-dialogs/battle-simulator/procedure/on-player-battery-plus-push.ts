import { PushDOM } from "../../../dom/push-dom";
import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";

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

  props.playerBattery = nextPlayerBattery;
  updateBattery(playerElements, nextPlayerBattery);
}
