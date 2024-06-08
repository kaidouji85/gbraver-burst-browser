import { DeleteAccountConsentDialog } from "../../../dom-dialogs/delete-account-consent";
import { deleteAccountConsentDialogConnector } from "../../action-connector/delete-account-consent-dialog-connector";
import type { GameProps } from "../../game-props";

/**
 * アカウント削除同意
 *
 * @param props ゲームプロパティ
 */
export function onAccountDeleteConsent(props: Readonly<GameProps>): void {
  const dialog = new DeleteAccountConsentDialog(props);
  props.domDialogBinder.bind(
    dialog,
    deleteAccountConsentDialogConnector(props),
  );
}
