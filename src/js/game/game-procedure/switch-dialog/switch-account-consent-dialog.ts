import { map } from "rxjs";

import { DeleteAccountConsentDialog } from "../../../dom-dialogs/delete-account-consent";
import { GameProps } from "../../game-props";

/**
 * アカウント削除同意ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog アカウント削除同意ダイアログ
 */
export const switchAccountConsentDialog = (
  props: GameProps,
  dialog: DeleteAccountConsentDialog,
) =>
  props.domDialogBinder.bind(dialog, () =>
    props.gameAction.connect([
      dialog
        .notifyAccountDeletion()
        .pipe(map(() => ({ type: "DeleteAccount" }))),
      dialog
        .notifyClosed()
        .pipe(map(() => ({ type: "CancelAccountDeletion" }))),
    ]),
  );
