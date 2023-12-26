import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { extractBackGround } from "../dom/extract-element";
import { LoginDialogProps } from "../props";
import { onCloseButtonPush } from "./on-close-button-push";
import { onCloserPush } from "./on-closer-push";
import { onLoginButtonPush } from "./on-login-button-push";
import { onPushOutsideOfDialog } from "./on-push-outside-of-dialog";

/**
 * イベントリスナーを登録する
 * @param props ログインダイアログのプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: LoginDialogProps): Unsubscribable[] {
  const backGround = extractBackGround(props.root);
  return [
    domPushStream(props.loginButton).subscribe((action) => {
      onLoginButtonPush(props, action);
    }),
    domPushStream(props.closeButton).subscribe((action) => {
      onCloseButtonPush(props, action);
    }),
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domPushStream(backGround).subscribe((action) => {
      onPushOutsideOfDialog(props, action);
    }),
  ];
}
