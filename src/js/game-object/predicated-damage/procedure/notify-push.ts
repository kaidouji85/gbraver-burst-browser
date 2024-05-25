import { filter, Observable } from "rxjs";

import { PredicatedDamageProps } from "../props/predicated-damage-props";

/**
 * 押下通知
 * @param props プロパティ
 * @returns 通知ストリーム
 */
export function notifyPush(props: PredicatedDamageProps): Observable<Event> {
  const { view, model } = props;
  return view.notifyPush().pipe(filter(() => !model.shouldPushNotifierStop));
}
