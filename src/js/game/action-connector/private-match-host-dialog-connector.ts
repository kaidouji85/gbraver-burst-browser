import { map } from "rxjs";

import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { PrivateMatchHostDialog } from "../../dom-dialogs/private-match-host";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * プライベートマッチ（ホスト）ダイアログとゲームアクションを関連付ける
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const privateMatchHostDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<PrivateMatchHostDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]);
