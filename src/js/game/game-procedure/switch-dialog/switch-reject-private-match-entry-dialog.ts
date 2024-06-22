import { map } from "rxjs";

import { RejectPrivateMatchEntryDialog } from "../../../dom-dialogs/reject-private-match-entry";
import { GameProps } from "../../game-props";

/**
 * プライベートマッチエントリ拒否ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog プライベートマッチエントリ拒否ダイアログ
 */
export const switchRejectPrivateMatchEntryDialog = (
  props: GameProps,
  dialog: RejectPrivateMatchEntryDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]),
  );
