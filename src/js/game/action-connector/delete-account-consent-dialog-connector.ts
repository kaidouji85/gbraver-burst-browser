import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DeleteAccountConsentDialog } from "../../dom-dialogs/delete-account-consent";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { GameAction } from "../game-actions";

/** 
 * アカウント削除同意ダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const deleteAccountConsentDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<DeleteAccountConsentDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog.notifyAccountDeletion().pipe(
        map(() => ({ type: "DeleteAccount" }))
      ),
      dialog.notifyClosed().pipe(
        map(() => ({ type: "CancelAccountDeletion" }))
      )
    ]);
