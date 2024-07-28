import { batteryMinusPop } from "../animation/battery-minus-pop";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * batteryMinusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function playBatteryMinusPop(props: BatterySelectorProps) {
  const { batteryMinusTween } = props;
  batteryMinusTween.update();
  batteryMinusTween.removeAll();
  await batteryMinusPop(props).play(batteryMinusTween);
}
