import { silentlyBatteryPlusPop } from "../animation/battery-plus-pop";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * silentlyBatteryPlusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function playSilentlyBatteryPlusPop(props: BatterySelectorProps) {
  const { batteryPlusTween } = props;
  batteryPlusTween.update();
  batteryPlusTween.removeAll();
  await silentlyBatteryPlusPop(props).play({ group: batteryPlusTween });
}
