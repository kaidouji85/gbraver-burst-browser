import { SignalContainer } from "../../../abort-controller/signal-container";
import { batteryMinusPop } from "../animation/battery-minus-pop";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * batteryMinusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @returns アニメーションが完了したら発火するPromise
 */
export async function playBatteryMinusPop(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer>,
) {
  const { batteryMinusTween } = props;
  batteryMinusTween.update();
  batteryMinusTween.removeAll();
  const signal = options?.signal;
  await batteryMinusPop(props).play({ group: batteryMinusTween, signal });
}
