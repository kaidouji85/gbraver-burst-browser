import { canBatteryMinus } from "../model/can-battery-minus";
import { BatterySelectorProps } from "../props";

/**
 * バッテリーマイナスボタン押下時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onBatteryMinusPush(
  props: Readonly<BatterySelectorProps>
): void {
  if (props.model.isPushNotifierDisabled || !canBatteryMinus(props.model)) {
    return;
  }

  props.batteryMinusPush.next();
}
