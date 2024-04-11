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
  const { batteryPlusTween, model } = props;
  if (!canBatteryPlus(model)) {
    return;
  }

  batteryPlusTween.update();
  batteryPlusTween.removeAll();
  await all(
    batteryPlusPop(props, batteryPlusTween),
    batteryChange(props, model.battery + 1),
  ).play();
}
