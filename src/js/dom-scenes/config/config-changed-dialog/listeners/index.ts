import { Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../../../dom/event-stream";
import type { ConfigChangedDialogProps } from "../props";
import { onAcceptPush } from "./on-accept-push";
import { onBackGroundPush } from "./on-back-ground-push";
import { onCloserPush } from "./on-closer-push";
import { onDiscardPush } from "./on-discard-push";

/**
 * ダイアログにイベントリスナをバインドする
 *
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: ConfigChangedDialogProps
): Unsubscribable[] {
  return [
    domImmediatePushStream(props.backGround).subscribe((action) => {
      onBackGroundPush(props, action);
    }),
    domImmediatePushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domImmediatePushStream(props.discard).subscribe((action) => {
      onDiscardPush(props, action);
    }),
    domImmediatePushStream(props.accept).subscribe((action) => {
      onAcceptPush(props, action);
    }),
  ];
}
