import { map } from "rxjs";

import { DifficultyDialog } from "../../dom-dialogs/difficulty";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * 難易度選択ダイアログのアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const difficultyDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<DifficultyDialog> =>
  (dialog) =>
    props.gameAction.connect([
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
