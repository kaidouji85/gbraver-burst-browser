import { SignalContainer } from "../../../abort-controller/signal-container";
import { popBatteryPlus } from "../animation/pop-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * batteryPlusPopアニメーションを再生する
 * @param props ゲームオブジェクトプロパティ
 * @param options オプション
 * @returns アニメーションが完了したら発火するPromise
 */
export async function playBatteryPlusPop(
  props: BatterySelectorProps,
  options?: Partial<SignalContainer>,
) {
  const { batteryPlusTween } = props;
  batteryPlusTween.update();
  batteryPlusTween.removeAll();
  const signal = options?.signal;
  await popBatteryPlus(props).play({ group: batteryPlusTween, signal });
}
