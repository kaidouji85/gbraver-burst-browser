import { SignalContainer } from "../../../abort-controller/signal-container";
import { canNumberChanged } from "../model/can-number-change";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";

/**
 * 指定されたバッテリー値に変更する
 * @param props ゲームオブジェクトプロパティ
 * @param value バッテリー値
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function toBattery(
  props: BatterySelectorProps,
  value: number,
  options?: Partial<SignalContainer>,
): Promise<void> {
  const { model } = props;
  if (!canNumberChanged(model, value)) {
    return;
  }

  await batteryChange(props, value, {
    ...options,
    timeScale: 0.5,
    shouldPlaySound: true,
  });
}
