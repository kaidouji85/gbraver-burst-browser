import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import type { ConfigChangedDialogProps } from "../props";
import { onAcceptPush } from "./on-accept-push";
import { onBackGroundPush } from "./on-back-ground-push";
import { onCloserPush } from "./on-closer-push";
import { onDiscardPush } from "./on-discard-push";

/**
 * ダイアログにイベントリスナをバインドする
 *
 * @param props 画面プロパティ
 * @returns バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: ConfigChangedDialogProps,
): Unsubscribable[] {
  return [
    domPushStream(props.backGround).subscribe((action) => {
      onBackGroundPush(props, action);
    }),
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domPushStream(props.discard).subscribe((action) => {
      onDiscardPush(props, action);
    }),
    domPushStream(props.accept).subscribe((action) => {
      onAcceptPush(props, action);
    }),
  ];
}
