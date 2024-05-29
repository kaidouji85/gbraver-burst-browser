import { DifficultyDialog } from "../../dom-dialogs/difficulty";
import type { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** コネクタのデータ型 */
type Connector = DomDialogActionConnector<DifficultyDialog>;

/** 難易度選択ダイアログとゲームアクションを関連付ける */
export const difficultyDialogConnector: Connector = (dialog, gameAction) => [
  dialog.notifySelectionComplete().subscribe((difficulty) => {
    gameAction.next({
      type: "DifficultySelectionComplete",
      difficulty,
    });
  }),
  dialog.notifyClosed().subscribe(() => {
    gameAction.next({
      type: "DifficultySelectionCancel",
    });
  }),
];
