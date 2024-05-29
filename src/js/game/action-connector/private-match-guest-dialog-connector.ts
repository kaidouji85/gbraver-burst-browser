import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { PrivateMatchGuestDialog } from "../../dom-dialogs/private-match-guest";
import { GameAction } from "../game-actions";

/**
 * プライベートマッチ（ゲスト）ダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const privateMatchGuestDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<PrivateMatchGuestDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog
        .notifyPrivateMatchStart()
        .pipe(map((roomID) => ({ type: "PrivateMatchEntry", roomID }))),
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "WithdrawPrivateMatchEntry" }))),
    ]);
