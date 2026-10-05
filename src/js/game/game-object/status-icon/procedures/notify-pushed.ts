import { filter, Observable } from "rxjs";

import { StatusIconProps } from "../props/status-icon-props";

/**
 * ボタン押下通知
 * @param props ステータスアイコンプロパティ
 * @returns 通知ストリーム
 */
export function notifyPushed(props: StatusIconProps): Observable<void> {
  return props.view.notifyPushed().pipe(
    filter(() => props.model.opacity === 1),
    filter(() => !props.disabled),
  );
}
