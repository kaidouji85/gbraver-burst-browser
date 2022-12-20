// @flow

import { LoginDialog } from "../../dom-dialogs/login/login-dialog";
import type { DomDialogActionConnector } from "../dom-dialog-binder/dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<LoginDialog>;

/** ログインダイアログとゲームアクションを関連付ける */
export const loginDialogConnector: Connector = (dialog, gameAction) => [
  dialog.loginNotifier().subscribe(() => {
    gameAction.next({ type: "UniversalLogin" });
  }),
  dialog.closeDialogNotifier().subscribe(() => {
    gameAction.next({ type: "LoginCancel" });
  }),
];
