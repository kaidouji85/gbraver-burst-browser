import { map } from "rxjs";

import { DeleteAccountConsentDialog } from "../../dom-dialogs/delete-account-consent";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * アカウント削除同意ダイアログのアクションコネクタを生成する
 * @param porps ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const deleteAccountConsentDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<DeleteAccountConsentDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog
        .notifyAccountDeletion()
        .pipe(map(() => ({ type: "DeleteAccount" }))),
      dialog
        .notifyClosed()
        .pipe(map(() => ({ type: "CancelAccountDeletion" }))),
    ]);
