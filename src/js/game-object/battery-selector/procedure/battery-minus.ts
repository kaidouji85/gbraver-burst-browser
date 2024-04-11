import { all } from "../../../animation/all";
import { batteryMinusPop } from "../animation/battery-minus-pop";
import { canBatteryMinus } from "../model/can-battery-minus";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";

/**
 * バッテリーマイナス
 * メモリ最小値の場合は何もしない
 * @param props ゲームオブジェクトプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function batteryMinus(props: BatterySelectorProps): Promise<void> {
  const { batteryMinusTween, model } = props;
  if (!canBatteryMinus(model)) {
    return;
  }

  batteryMinusTween.update();
  batteryMinusTween.removeAll();
  await all(
    batteryMinusPop(props, batteryMinusTween),
    batteryChange(props, model.battery - 1),
  ).play();
}
