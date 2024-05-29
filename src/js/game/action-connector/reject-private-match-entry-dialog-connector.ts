import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { RejectPrivateMatchEntryDialog } from "../../dom-dialogs/reject-private-match-entry";
import { GameAction } from "../game-actions";

/**
 * プライベートマッチエントリ拒否ダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const rejectPrivateMatchEntryDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<RejectPrivateMatchEntryDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]);
