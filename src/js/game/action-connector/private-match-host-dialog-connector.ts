import { PrivateMatchHostDialog } from "../../dom-dialogs/private-match-host";
import type { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<PrivateMatchHostDialog>;

/** プライベートマッチ（ホスト）ダイアログとゲームアクションを関連付ける */
export const privateMatchHostDialogConnector: Connector = (
  dialog,
  gameAction,
) => [
  dialog.notifyDialogClosed().subscribe(() => {
    gameAction.next({ type: "MatchingCanceled" });
  }),
];
