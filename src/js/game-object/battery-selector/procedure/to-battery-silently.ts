import { waitTime } from "../../../wait/wait-time";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";
import { playSilentlyBatteryMinusPop } from "./play-silently-battery-minus-pop";
import { playSilentlyBatteryPlusPop } from "./play-silently-battery-plus-pop";

/**
 * プラスボタンアニメーション
 * @param props ゲームオブジェクトプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function plusButton(props: BatterySelectorProps): Promise<void> {
  const { model } = props;
  await Promise.all([
    playSilentlyBatteryPlusPop(props),
    batteryChange(props, model.battery + 1),
  ]);
}

/**
 * マイナスボタンアニメーション
 * @param props ゲームオブジェクトプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function minusButton(props: BatterySelectorProps): Promise<void> {
  const { model } = props;
  await Promise.all([
    playSilentlyBatteryMinusPop(props),
    batteryChange(props, model.battery - 1),
  ]);
}

/**
 * バッテリー値を設定する(無音）
 * @param props ゲームオブジェクトプロパティ
 * @param battery バッテリー設定値
 * @param duration ボタンを押す間隔（ミリ秒）
 * @returns 処理が完了したら発火するPromise
 */
export async function toBatterySilently(
  props: BatterySelectorProps,
  battery: number,
  duration: number,
): Promise<void> {
  const { model } = props;
  const diff = battery - model.battery;
  const count = Math.abs(diff);
  const pushButton = () => (0 < diff ? plusButton(props) : minusButton(props));
  for (let i = 0; i < count; i++) {
    pushButton();
    await waitTime(duration);
  }
}
