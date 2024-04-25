import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { DeleteAccountConsentDialogProps } from "../props";
import { onCloseButtonPush } from "./on-close-button-push";
import { onCloserPush } from "./on-closer-push";
import { onDeleteAccountButtonPush } from "./on-delete-account-button-push";
import { onPushOutsideOfDialog } from "./on-push-outside-of-dialog";

/**
 * ダイアログにイベントリスナを関連づける
 * @param props ダイアログのプロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: DeleteAccountConsentDialogProps,
): Unsubscribable[] {
  return [
    domPushStream(props.backGround).subscribe((action) => {
      onPushOutsideOfDialog(props, action);
    }),
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domPushStream(props.deleteAccountButton).subscribe((action) => {
      onDeleteAccountButtonPush(props, action);
    }),
    domPushStream(props.closeButton).subscribe((action) => {
      onCloseButtonPush(props, action);
    }),
  ];
}
