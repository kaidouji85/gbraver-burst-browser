import { DeleteAccountConsentDialog } from "../../../dom-dialogs/delete-account-consent";
import { deleteAccountConsentDialogConnector } from "../../action-connector/delete-account-consent-dialog-connector";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * アカウント削除同意
 * @param props ゲームプロパティ
 */
function onAccountDeleteConsent(props: Readonly<GameProps>): void {
  const dialog = new DeleteAccountConsentDialog(props);
  props.domDialogBinder.bind(
    dialog,
    deleteAccountConsentDialogConnector(props),
  );
}

/** アクションタイプ */
const actionType = "AccountDeleteConsent";

/** アカウント削除同意時のイベントリスナーコンテナ */
export const accountDeleteConsentContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onAccountDeleteConsent(props);
  },
};
