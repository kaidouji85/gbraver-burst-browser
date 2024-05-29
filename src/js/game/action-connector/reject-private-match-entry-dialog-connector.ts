import { RejectPrivateMatchEntryDialog } from "../../dom-dialogs/reject-private-match-entry";
import type { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<RejectPrivateMatchEntryDialog>;

/** プライベートマッチエントリ拒否ダイアログとゲームアクションを関連付ける */
export const rejectPrivateMatcEntryDialogConnector: Connector = (
  dialog,
  gameAction,
) => [
  dialog.notifyDialogClosed().subscribe(() => {
    gameAction.next({ type: "MatchingCanceled" });
  }),
];
