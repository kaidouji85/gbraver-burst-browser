import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";

/**
 * 敵のバッテリープラスボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onEnemyBatteryPlusPush(
  props: BattleSimulatorProps,
  action: PushDOM,
) {
  const { enemy, enemyBattery, enemyElements } = props;
  const { event } = action;

  event.preventDefault();
  event.stopPropagation();

  const nextEnemyBattery = enemyBattery + 1;
  if (enemy.armdozer.maxBattery < nextEnemyBattery) {
    return;
  }

  pop(enemyElements.batteryPlus);
  props.enemyBattery = nextEnemyBattery;
  updateBattery(enemyElements, nextEnemyBattery);
}
