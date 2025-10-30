import { SignalContainer } from "../../../abort-controller/signal-container";
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
 * @param options.timeScale アニメーション時間倍率
 * @param options.shouldPlaySound サウンドを再生するかどうか、trueの場合再生する
 * @returns アニメーション
 */
export function batteryChange(
  props: BatterySelectorProps,
  battery: number,
  options?: Partial<
    SignalContainer & { timeScale: number; shouldPlaySound: boolean }
  >,
): Promise<void> {
  const { batteryChangeTween, model, se, sounds } = props;
  const signal = options?.signal;
  const shouldPlaySound = options?.shouldPlaySound ?? false;
  batteryChangeTween.update();
  batteryChangeTween.removeAll();
  const needle = getNeedleValue(battery, model.maxBattery);
  return all(
    onStart(() => (model.battery = battery)),
    onStart(() => shouldPlaySound && se.play(sounds.batteryChangeSound)),
    changeNeedle(props, needle, options?.timeScale),
  ).play({ group: batteryChangeTween, signal });
}
