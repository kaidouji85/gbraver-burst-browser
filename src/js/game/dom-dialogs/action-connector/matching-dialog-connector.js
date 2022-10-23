// @flow

import { MatchingDialog } from "../matching/matching-dialog";
import type { DomDialogActionConnector } from "./dom-dialog-action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<MatchingDialog>;

/** マッチングダイアログとゲームアクションを関連付ける */
export const matchingDialogConnector: Connector = (dialog, gameAction) => [
  dialog.matchingCanceledNotifier().subscribe(() => {
    gameAction.next({ type: "MatchingCanceled" });
  }),
];
