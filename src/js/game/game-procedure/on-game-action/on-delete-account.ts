import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";

/**
 * アカウント削除
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onDeleteAccount(props: Readonly<GameProps>): Promise<void> {
  const dialog = new WaitingDialog("アカウント削除中");
  switchWaitingDialog(props, dialog);
  await props.api.deleteLoggedInUser();
  await props.fader.fadeOut();
  await props.api.logout();
}

/** アクションタイプ */
const actionType = "DeleteAccount";

/** アカウント削除時のイベントリスナーコンテナ */
export const deleteAccountContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onDeleteAccount(props);
  },
};
