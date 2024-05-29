import { LoginDialog } from "../../dom-dialogs/login";
import type { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<LoginDialog>;

/** ログインダイアログとゲームアクションを関連付ける */
export const loginDialogConnector: Connector = (dialog, gameAction) => [
  dialog.notifyLogin().subscribe(() => {
    gameAction.next({
      type: "UniversalLogin",
    });
  }),
  dialog.notifyClosed().subscribe(() => {
    gameAction.next({
      type: "LoginCancel",
    });
  }),
];
