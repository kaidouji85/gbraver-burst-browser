import { SignalContainer } from "../../../abort-controller/signal-container";
import { popBatteryPlusSilently } from "../animation/pop-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * silentlyBatteryPlusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @returns アニメーションが完了したら発火するPromise
 */
export async function playSilentlyBatteryPlusPop(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer>,
) {
  const { batteryPlusTween } = props;
  batteryPlusTween.update();
  batteryPlusTween.removeAll();
  const signal = options?.signal;
  await popBatteryPlusSilently(props).play({ group: batteryPlusTween, signal });
}
