import { filter, Observable } from "rxjs";

import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * 数字が押されたことを通知する
 * @param props プロパティ
 * @returns 通知のObservable
 */
export function notifyNumberPushed(
  props: BatterySelectorProps,
): Observable<number> {
  const { view, model } = props;
  return view.notifyNumberPushed().pipe(
    filter(() => !model.shouldPushNotifierStop),
    filter(() => !props.disabled),
  );
}
