import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { GameAction } from "../game-actions";

/**
 * マッチングダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const matchingDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<MatchingDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog
        .notifyMatchingCanceled()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]);
