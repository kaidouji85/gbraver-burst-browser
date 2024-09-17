import { Unsubscribable } from "rxjs";

import { domClickStream, domPushStream } from "../../../dom/push-dom";
import { PrivateMatchHostDialogProps } from "../props";
import { onCloserPush } from "./on-closer-push";
import { onCopyRoomIdPush } from "./on-copy-room-id-push";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: PrivateMatchHostDialogProps,
): Unsubscribable[] {
  return [
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domClickStream(props.copyRoomID).subscribe((action) => {
      onCopyRoomIdPush(props, action);
    }),
  ];
}
