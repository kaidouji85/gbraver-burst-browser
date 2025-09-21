import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { StatusDialogProps } from "../props";
import { onBackGroundPush } from "./on-back-ground-push";
import { onCloserPush } from "./on-closer-push";

/**
 * イベントリスナーをバインドする
 * @param props ダイアログのプロパティ
 * @returns アンサブスクライバブル
 */
export function bindEventListeners(props: StatusDialogProps): Unsubscribable[] {
  return [
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush({ props, action });
    }),
    domPushStream(props.background).subscribe((action) => {
      onBackGroundPush({ props, action });
    }),
  ];
}
