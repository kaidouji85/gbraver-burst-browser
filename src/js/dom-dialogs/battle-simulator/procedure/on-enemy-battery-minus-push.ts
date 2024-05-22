import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";
import { updateBatteryButtons } from "./update-battery-buttons";
import { updateBattleResult } from "./update-battle-result";

/**
 * 敵のバッテリーマイナスボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onEnemyBatteryMinusPush(
  props: BattleSimulatorProps,
  action: PushDOM,
) {
  const { exclusive, enemyBattery, enemyElements, se, changeValue } = props;
  const { event } = action;

  event.preventDefault();
  event.stopPropagation();

  exclusive.execute(async () => {
    const nextEnemyBattery = enemyBattery - 1;
    se.play(changeValue);
    pop(enemyElements.batteryMinus);
    props.enemyBattery = nextEnemyBattery;
    updateBattery(enemyElements, nextEnemyBattery);
    updateBattleResult(props);
    updateBatteryButtons(props);
  });
}
