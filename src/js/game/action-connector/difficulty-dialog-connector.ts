import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DifficultyDialog } from "../../dom-dialogs/difficulty";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { GameAction } from "../game-actions";

/**
 * 難易度選択ダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const difficultyDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<DifficultyDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog.notifySelectionComplete().pipe(
        map((difficulty) => ({
          type: "DifficultySelectionComplete",
          difficulty,
        })),
      ),
      dialog
        .notifyClosed()
        .pipe(map(() => ({ type: "DifficultySelectionCancel" }))),
    ]);
