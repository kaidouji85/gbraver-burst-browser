import { SignalContainer } from "../../../abort-cntroller/signal-container";
import { all } from "../../../animation/all";
import { onStart } from "../../../animation/on-start";
import { changeNeedle } from "../animation/change-needle";
import { getNeedleValue } from "../model/needle-value";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリー値を変更するヘルパー関数
 * @param props ゲームオブジェクトプロパティ
 * @param battery 変更するバッテリー値
 * @param options オプション
 * @returns アニメーション
 */
export function batteryChange(
  props: BatterySelectorProps,
  battery: number,
  options?: Partial<SignalContainer>,
): Promise<void> {
  const { batteryChangeTween, model } = props;
  const signal = options?.signal;
  batteryChangeTween.update();
  batteryChangeTween.removeAll();
  const needle = getNeedleValue(battery, model.maxBattery);
  return all(
    onStart(() => {
      model.battery = battery;
    }),
    changeNeedle(props, needle),
  ).play({ group: batteryChangeTween, signal });
}
