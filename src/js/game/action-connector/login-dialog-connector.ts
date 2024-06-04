import { map } from "rxjs";

import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { LoginDialog } from "../../dom-dialogs/login";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * ログインダイアログのアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const loginDialogConnector =
  (props: GameActionManageContainer): DomDialogActionConnector<LoginDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog.notifyLogin().pipe(map(() => ({ type: "UniversalLogin" }))),
      dialog.notifyClosed().pipe(map(() => ({ type: "LoginCancel" }))),
    ]);
