import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";
import { updateBatteryButtons } from "./update-battery-buttons";
import { updateBattleResult } from "./update-battle-result";

/**
 * 敵のバッテリープラスボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onEnemyBatteryPlusPush(
  props: BattleSimulatorProps,
  action: PushDOM,
) {
  const { exclusive, enemyBattery, enemyElements, se, changeValue } = props;
  const { event } = action;

  event.preventDefault();
  event.stopPropagation();

  exclusive.execute(async () => {
    const targetBatteryButton = enemyElements.batteryPlus;
    // iPhone、iPadでは、disabled属性が付与されているボタンを押下しても、
    // touchstartが発火するため、disabled属性のチェックが必要
    if (targetBatteryButton.disabled) {
      return;
    }

    const nextEnemyBattery = enemyBattery + 1;
    se.play(changeValue);
    pop(targetBatteryButton);
    props.enemyBattery = nextEnemyBattery;
    updateBattery(enemyElements, nextEnemyBattery);
    updateBattleResult(props);
    updateBatteryButtons(props);
  });
}
