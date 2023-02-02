import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import type { DomDialogActionConnector } from "../dom-dialog-binder/dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<MatchingDialog>;

/** マッチングダイアログとゲームアクションを関連付ける */
export const matchingDialogConnector: Connector = (dialog, gameAction) => [
  dialog.notifyMatchingCanceled().subscribe(() => {
    gameAction.next({
      type: "MatchingCanceled",
    });
  }),
];
