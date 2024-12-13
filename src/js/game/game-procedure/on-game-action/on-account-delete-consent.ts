import { DeleteAccountConsentDialog } from "../../../dom-dialogs/delete-account-consent";
import { AccountDeleteConsent } from "../../game-actions/account-delete-consent";
import { GameProps } from "../../game-props";
import { switchAccountConsentDialog } from "../switch-dialog/switch-account-consent-dialog";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: AccountDeleteConsent;
};

/**
 * アカウント削除同意
 * @param options オプション
 */
export function onAccountDeleteConsent(options: Options): void {
  const { props } = options;
  const dialog = new DeleteAccountConsentDialog(props);
  switchAccountConsentDialog(props, dialog);
}
