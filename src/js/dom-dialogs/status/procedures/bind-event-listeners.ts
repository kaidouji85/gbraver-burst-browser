import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { StatusDialogProps } from "../props";
import { onCloserPush } from "./on-closer-push";
import { onRootPush } from "./on-root-push";

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
    domPushStream(props.root).subscribe((action) => {
      onRootPush({ props, action });
    }),
  ];
}
