import { filter, Observable } from "rxjs";

import { BurstButtonProps } from "../props/burst-button-props";

/**
 * ボタン押下通知
 * @param props プロパティ
 * @returns 通知ストリーム
 */
export function notifyPressed(props: BurstButtonProps): Observable<Event> {
  const { view, model } = props;
  return view.notifyPush().pipe(
    filter(() => !model.shouldPushNotifierStop),
    filter(() => !props.disabled),
    filter(() => model.canActivateBurst),
  );
}
