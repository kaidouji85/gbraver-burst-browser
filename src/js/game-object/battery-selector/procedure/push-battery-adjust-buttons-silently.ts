import { SignalContainer } from "../../../abort-controller/signal-container";
import { waitTime } from "../../../wait/wait-time";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";
import { playSilentlyBatteryMinusPop } from "./play-silently-battery-minus-pop";
import { playSilentlyBatteryPlusPop } from "./play-silently-battery-plus-pop";

/**
 * プラスボタンアニメーション
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @param options.timeScale アニメーション時間倍率
 * @returns 処理が完了したら発火するPromise
 */
async function plusButton(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer & { timeScale: number }>,
): Promise<void> {
  const { model } = props;
  await Promise.all([
    playSilentlyBatteryPlusPop(props, options),
    batteryChange(props, model.battery + 1, options),
  ]);
}

/**
 * マイナスボタンアニメーション
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @param options.timeScale アニメーション時間倍率
 * @returns 処理が完了したら発火するPromise
 */
async function minusButton(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer & { timeScale: number }>,
): Promise<void> {
  const { model } = props;
  await Promise.all([
    playSilentlyBatteryMinusPop(props, options),
    batteryChange(props, model.battery - 1, options),
  ]);
}

/** バッテリー調整ボタンを無音で押す際のオプション */
export type SilentlyBatteryAdjustOptions = Partial<
  SignalContainer & {
    /** ボタンを押す間隔（ミリ秒） */
    interval: number;
    /** アニメーション時間倍率 */
    timeScale: number;
  }
>;

/**
 * バッテリー調整ボタンを無音で押す
 * @param props ゲームオブジェクトプロパティ
 * @param battery バッテリー設定値
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function pushBatteryAdjustButtonsSilently(
  props: BatterySelectorProps,
  battery: number,
  options?: SilentlyBatteryAdjustOptions,
): Promise<void> {
  const { model } = props;
  const { interval = 200 } = options || {};
  const diff = battery - model.battery;
  const count = Math.abs(diff);
  const pushButton = () =>
    0 < diff ? plusButton(props, options) : minusButton(props, options);
  for (let i = 0; i < count; i++) {
    pushButton();
    await waitTime(interval);
  }
}
