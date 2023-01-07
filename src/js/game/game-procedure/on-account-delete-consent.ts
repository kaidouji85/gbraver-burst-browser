import { $ReadOnly } from "utility-types";
import { DeleteAccountConsentDialog } from "../../dom-dialogs/delete-account-consent/delete-account-consent-dialog";
import { deleteAccountConsentDialogConnector } from "../action-connector/delete-account-consent-dialog-connector";
import type { GameProps } from "../game-props";

/**
 * アカウント削除同意
 *
 * @param props ゲームプロパティ
 */
export function onAccountDeleteConsent(props: $ReadOnly<GameProps>): void {
  const dialog = new DeleteAccountConsentDialog(props.resources);
  props.domDialogBinder.bind(dialog, deleteAccountConsentDialogConnector);
}