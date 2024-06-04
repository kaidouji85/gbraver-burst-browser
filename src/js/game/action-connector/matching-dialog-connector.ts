import { map } from "rxjs";

import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * マッチングダイアログのアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const matchingDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<MatchingDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog
        .notifyMatchingCanceled()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]);
