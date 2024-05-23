import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";
import { updateBatteryButtons } from "./update-battery-buttons";
import { updateBattleResult } from "./update-battle-result";

/**
 * プレイヤーのバッテリーマイナスボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPlayerBatteryMinusPush(
  props: BattleSimulatorProps,
  action: PushDOM,
) {
  const { exclusive, playerBattery, playerElements, se, changeValue } = props;
  const { event } = action;

  event.preventDefault();
  event.stopPropagation();

  exclusive.execute(async () => {
    const nextPlayerBattery = playerBattery - 1;
    se.play(changeValue);
    pop(playerElements.batteryMinus);
    props.playerBattery = nextPlayerBattery;
    updateBattery(playerElements, nextPlayerBattery);
    updateBattleResult(props);
    updateBatteryButtons(props);
  });
}
