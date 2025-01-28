import { SignalContainer } from "../../../abort-cntroller/signal-container";
import { canBatteryMinus } from "../model/can-battery-minus";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";
import { playBatteryMinusPop } from "./play-battery-minus-pop";

/**
 * バッテリーマイナス
 * メモリ最小値の場合は何もしない
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function batteryMinus(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer>,
): Promise<void> {
  const { model } = props;
  if (!canBatteryMinus(model)) {
    return;
  }

  await Promise.all([
    playBatteryMinusPop(props, options),
    batteryChange(props, model.battery - 1, options),
  ]);
}
