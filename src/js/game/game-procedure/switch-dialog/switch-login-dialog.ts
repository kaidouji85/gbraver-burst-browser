import { map } from "rxjs";

import { LoginDialog } from "../../../dom-dialogs/login";
import { GameProps } from "../../game-props";

/**
 * ログインダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog ログインダイアログ
 */
export const switchLoginDialog = (props: GameProps, dialog: LoginDialog) =>
  props.domDialogBinder.bind(dialog, () =>
    props.gameAction.connect([
      dialog.notifyLogin().pipe(map(() => ({ type: "UniversalLogin" }))),
      dialog.notifyClosed().pipe(map(() => ({ type: "LoginCancel" }))),
    ]),
  );
