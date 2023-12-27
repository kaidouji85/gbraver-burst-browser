import { DeleteAccountConsentDialog } from "../../dom-dialogs/delete-account-consent";
import type { DomDialogActionConnector } from "../dom-dialog-binder/dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<DeleteAccountConsentDialog>;

/** アカウント削除同意ダイアログとゲームアクションを関連付ける */
export const deleteAccountConsentDialogConnector: Connector = (
  dialog,
  gameAction,
) => [
  dialog.notifyAccountDeletion().subscribe(() => {
    gameAction.next({
      type: "DeleteAccount",
    });
  }),
  dialog.notifyClosed().subscribe(() => {
    gameAction.next({
      type: "CancelAccountDeletion",
    });
  }),
];
