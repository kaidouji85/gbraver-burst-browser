import { map } from "rxjs";

import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { RejectPrivateMatchEntryDialog } from "../../dom-dialogs/reject-private-match-entry";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * プライベートマッチエントリ拒否ダイアログのアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const rejectPrivateMatchEntryDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<RejectPrivateMatchEntryDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]);
