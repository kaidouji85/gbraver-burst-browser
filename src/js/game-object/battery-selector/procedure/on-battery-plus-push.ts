import { canBatteryPlus } from "../model/can-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリープラスボタン押下時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onBatteryPlusPush(props: Readonly<BatterySelectorProps>): void {
  const { model, batteryPlusPush } = props;
  if (
    model.isPushNotifierDisabled ||
    model.disabled ||
    !canBatteryPlus(model)
  ) {
    return;
  }

  batteryPlusPush.next();
}
