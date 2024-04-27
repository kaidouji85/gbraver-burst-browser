import { all } from "../../../animation/all";
import { waitTime } from "../../../wait/wait-time";
import { silentlyBatteryMinusPop } from "../animation/battery-minus-pop";
import { silentlyBatteryPlusPop } from "../animation/battery-plus-pop";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { batteryChange } from "./battery-change";

/**
 * プラスボタンアニメーション
 * @param props ゲームオブジェクトプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function plusButton(props: BatterySelectorProps): Promise<void> {
  const { batteryPlusTween, model } = props;
  batteryPlusTween.update();
  batteryPlusTween.removeAll();
  await all(
    silentlyBatteryPlusPop(props, batteryPlusTween),
    batteryChange(props, model.battery + 1),
  ).play();
}

/**
 * マイナスボタンアニメーション
 * @param props ゲームオブジェクトプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function minusButton(props: BatterySelectorProps): Promise<void> {
  const { batteryMinusTween, model } = props;
  batteryMinusTween.update();
  batteryMinusTween.removeAll();
  await all(
    silentlyBatteryMinusPop(props, batteryMinusTween),
    batteryChange(props, model.battery - 1),
  ).play();
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
