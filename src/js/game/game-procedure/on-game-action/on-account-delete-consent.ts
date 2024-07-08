import { DeleteAccountConsentDialog } from "../../../dom-dialogs/delete-account-consent";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { switchAccountConsentDialog } from "../switch-dialog/switch-account-consent-dialog";

/**
 * アカウント削除同意
 * @param props ゲームプロパティ
 */
function onAccountDeleteConsent(props: Readonly<GameProps>): void {
  const dialog = new DeleteAccountConsentDialog(props);
  switchAccountConsentDialog(props, dialog);
}

/** アクションタイプ */
const actionType = "AccountDeleteConsent";

/** アカウント削除同意時のイベントリスナーコンテナ */
export const accountDeleteConsentContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onAccountDeleteConsent(props);
  },
};
