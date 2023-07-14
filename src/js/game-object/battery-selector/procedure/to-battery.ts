import { waitTime } from "../../../wait/wait-time";
import { BatterySelectorProps } from "../props";
import { batteryMinus } from "./battery-minus";
import { batteryPlus } from "./battery-plus";

/**
 * バッテリー値を設定する
 * @param props ゲームオブジェクトプロパティ
 * @param battery バッテリー設定値
 * @param duration ボタンを押す間隔（ミリ秒）
 * @return 処理が完了したら発火するPromise
 */
export async function toBattery(
  props: BatterySelectorProps,
  battery: number,
  duration: number
): Promise<void> {
  const diff = battery - props.model.battery;
  const count = Math.abs(diff);
  const pushButton = () => 0 < diff ? batteryPlus(props) : batteryMinus(props);
  for (let i=0; i<count; i++) {
    pushButton();
    waitTime(duration);
  }
}