import { filter, Observable } from "rxjs";

import { PilotButtonProps } from "../props/pilot-button-props";

/**
 * 押下通知
 * @param props プロパティ
 * @returns 通知ストリーム
 */
export function notifyPressed(props: PilotButtonProps): Observable<Event> {
  const { view, model } = props;
  return view.notifyPressed().pipe(
    filter(() => !model.shouldPushNotifierStop),
    filter(() => !props.disabled),
    filter(() => model.canActivatePilotSkill),
  );
}
