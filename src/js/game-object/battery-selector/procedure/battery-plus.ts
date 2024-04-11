import { all } from "../../../animation/all";
import { batteryPlusPop } from "../animation/battery-plus-pop";
import { canBatteryPlus } from "../model/can-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";

/**
 * バッテリープラス
 * メモリ最大値の場合は何もしない
 * @param props ゲームオブジェクトプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function batteryPlus(props: BatterySelectorProps): Promise<void> {
  if (!canBatteryPlus(props.model)) {
    return;
  }

  props.batteryPlusTween.update();
  props.batteryPlusTween.removeAll();
  await all(
    batteryPlusPop(props, props.batteryPlusTween),
    batteryChange(props, props.model.battery + 1),
  ).play();
}
