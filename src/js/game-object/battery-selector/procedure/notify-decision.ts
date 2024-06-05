import { filter, Observable } from "rxjs";

import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * 決定ボタン押下ストリーム
 * @param props バッテリーセレクタプロパティ
 * @returns 通知ストリーム
 */
export function notifyDecision(props: BatterySelectorProps): Observable<Event> {
  const { view, model } = props;
  return view.okButtonPushNotifier().pipe(
    filter(() => !model.shouldPushNotifierStop),
    filter(() => !props.disabled),
  );
}
