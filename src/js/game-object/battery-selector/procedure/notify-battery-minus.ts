import { filter, Observable } from "rxjs";

import { canBatteryMinus } from "../model/can-battery-minus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * バッテリーマイナスボタン押下通知
 * @param props プロパティ
 * @returns 通知ストリーム
 */
export function notifyBatteryMinus(
  props: BatterySelectorProps,
): Observable<unknown> {
  const { view, model } = props;
  return view.notifyMinusButtonPushed().pipe(
    filter(() => !model.shouldPushNotifierStop),
    filter(() => !props.disabled),
    filter(() => canBatteryMinus(model)),
  );
}
