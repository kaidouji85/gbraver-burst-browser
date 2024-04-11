import { canBatteryPlus } from "../model/can-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリープラスボタン押下時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onBatteryPlusPush(props: Readonly<BatterySelectorProps>): void {
  if (
    props.model.isPushNotifierDisabled ||
    props.model.disabled ||
    !canBatteryPlus(props.model)
  ) {
    return;
  }

  props.batteryPlusPush.next();
}
