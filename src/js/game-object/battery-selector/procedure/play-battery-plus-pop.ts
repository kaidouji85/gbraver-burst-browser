import { batteryPlusPop } from "../animation/battery-plus-pop";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * batteryPlusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function playBatteryPlusPop(props: BatterySelectorProps) {
  const { batteryPlusTween } = props;
  batteryPlusTween.update();
  batteryPlusTween.removeAll();
  await batteryPlusPop(props).play({ group: batteryPlusTween});
}
