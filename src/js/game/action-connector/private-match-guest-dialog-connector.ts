import { PrivateMatchGuestDialog } from "../../dom-dialogs/private-match-guest";
import type { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<PrivateMatchGuestDialog>;

/** プライベートマッチ（ゲスト）ダイアログとゲームアクションを関連付ける */
export const privateMatchGuestDialogConnector: Connector = (
  dialog,
  gameAction,
) => [
  dialog.notifyPrivateMatchStart().subscribe((roomID) => {
    gameAction.next({ type: "PrivateMatchEntry", roomID });
  }),
  dialog.notifyDialogClosed().subscribe(() => {
    gameAction.next({ type: "WithdrawPrivateMatchEntry" });
  }),
];
