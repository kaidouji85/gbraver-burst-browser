import { canBatteryMinus } from "../model/can-battery-minus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリーマイナスボタン押下時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onBatteryMinusPush(
  props: Readonly<BatterySelectorProps>,
): void {
  const { model, batteryMinusPush } = props;
  if (
    model.shouldPushNotifierStop ||
    model.disabled ||
    !canBatteryMinus(model)
  ) {
    return;
  }

  batteryMinusPush.next();
}
