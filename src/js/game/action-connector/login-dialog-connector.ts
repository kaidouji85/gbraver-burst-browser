import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { LoginDialog } from "../../dom-dialogs/login";
import { GameAction } from "../game-actions";

/**
 * ログインダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const loginDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<LoginDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog.notifyLogin().pipe(map(() => ({ type: "UniversalLogin" }))),
      dialog.notifyClosed().pipe(map(() => ({ type: "LoginCancel" }))),
    ]);
