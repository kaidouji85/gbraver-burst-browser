import { SignalContainer } from "../../../abort-controller/signal-container";
import { canBatteryPlus } from "../model/can-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";
import { playBatteryPlusPop } from "./play-battery-plus-pop";

/**
 * バッテリープラス
 * メモリ最大値の場合は何もしない
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function batteryPlus(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer>,
): Promise<void> {
  const { model } = props;
  if (!canBatteryPlus(model)) {
    return;
  }

  await Promise.all([
    playBatteryPlusPop(props, options),
    batteryChange(props, model.battery + 1, options),
  ]);
}
