import { map } from "rxjs";

import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { PrivateMatchGuestDialog } from "../../dom-dialogs/private-match-guest";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * プライベートマッチ（ゲスト）ダイアログのアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const privateMatchGuestDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<PrivateMatchGuestDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog
        .notifyPrivateMatchStart()
        .pipe(map((roomID) => ({ type: "PrivateMatchEntry", roomID }))),
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "WithdrawPrivateMatchEntry" }))),
    ]);
