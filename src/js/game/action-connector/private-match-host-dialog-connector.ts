import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { PrivateMatchHostDialog } from "../../dom-dialogs/private-match-host";
import { GameAction } from "../game-actions";

/** プライベートマッチ（ホスト）ダイアログとゲームアクションを関連付ける */
export const privateMatchHostDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<PrivateMatchHostDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]);
