import { filter, Observable } from "rxjs";

import { canBatteryPlus } from "../model/can-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリープラスボタン押下通知
 * @param props プロパティ
 * @returns 通知ストリーム
 */
export function notifyBatteryPlus(
  props: BatterySelectorProps,
): Observable<unknown> {
  const { view, model } = props;
  return view.plusButtonPushNotifier().pipe(
    filter(() => !model.shouldPushNotifierStop),
    filter(() => !props.disabled),
    filter(() => canBatteryPlus(model)),
  );
}
