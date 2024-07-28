import { batteryPlusPop } from "../animation/battery-plus-pop";
import { canBatteryPlus } from "../model/can-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";

/**
 * batteryPlusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function playBatteryPop(props: BatterySelectorProps) {
  const { batteryPlusTween } = props;
  batteryPlusTween.update();
  batteryPlusTween.removeAll();
  await batteryPlusPop(props).play(batteryPlusTween);
}

/**
 * バッテリープラス
 * メモリ最大値の場合は何もしない
 * @param props ゲームオブジェクトプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function batteryPlus(props: BatterySelectorProps): Promise<void> {
  const { model } = props;
  if (!canBatteryPlus(model)) {
    return;
  }

  await Promise.all([
    playBatteryPop(props),
    batteryChange(props, model.battery + 1),
  ]);
}
