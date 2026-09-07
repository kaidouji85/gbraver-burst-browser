import { map } from "rxjs";

import { PasswordMatchSelectorDialog } from "../../../dom-dialogs/password-match-selector";
import { GameProps } from "../../game-props";

/**
 * ローカル対戦選択ダイアログに切り替える
 * @param props プロパティ
 * @param dialog ダイアログ
 */
export const switchLocalBattleSelectorDialog = (
  props: GameProps,
  dialog: PasswordMatchSelectorDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog
        .notifyHostSelection()
        .pipe(map(() => ({ type: "LocalBattleHostStart" }))),
      dialog
        .notifyGuestSelection()
        .pipe(map(() => ({ type: "PasswordMatchGuestStart" }))),
      dialog.notifyClosed().pipe(map(() => ({ type: "PasswordMatchCancel" }))),
    ]),
  );
