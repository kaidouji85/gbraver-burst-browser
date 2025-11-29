import { SignalContainer } from "../../../abort-controller/signal-container";
import { popBatteryMinusSilently } from "../animation/pop-battery-minus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * silentlyBatteryMinusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @returns アニメーションが完了したら発火するPromise
 */
export async function playSilentlyBatteryMinusPop(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer>,
) {
  const { batteryMinusTween } = props;
  batteryMinusTween.update();
  batteryMinusTween.removeAll();
  const signal = options?.signal;
  await popBatteryMinusSilently(props).play({
    group: batteryMinusTween,
    signal,
  });
}
