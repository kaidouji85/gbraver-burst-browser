import { canBatteryMinus } from "../model/can-battery-minus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリーマイナスボタン押下時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onBatteryMinusPush(
  props: Readonly<BatterySelectorProps>,
): void {
  if (
    props.model.isPushNotifierDisabled ||
    props.model.disabled ||
    !canBatteryMinus(props.model)
  ) {
    return;
  }

  props.batteryMinusPush.next();
}
