// @flow
import { waitingDialogConnector } from "../dom-dialogs/action-connector/waiting-dialog-connector";
import { WaitingDialog } from "../dom-dialogs/waiting/waiting-dialog";
import type { GameProps } from "../game-props";

/**
 * アカウント削除
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onDeleteAccount(
  props: $ReadOnly<GameProps>
): Promise<void> {
  const dialog = new WaitingDialog("アカウント削除中");
  props.domDialogs.bind(dialog, waitingDialogConnector);
  await props.api.deleteLoggedInUser();
  await props.fader.fadeOut();
  await props.api.logout();
}
