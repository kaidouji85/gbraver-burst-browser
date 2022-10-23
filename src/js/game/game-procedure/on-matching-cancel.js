// @flow
import { waitingDialogConnector } from "../dom-dialogs/action-connector/waiting-dialog-connector";
import { WaitingDialog } from "../dom-dialogs/waiting/waiting-dialog";
import type { GameProps } from "../game-props";

/**
 * マッチング中止
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onMatchingCanceled(
  props: $ReadOnly<GameProps>
): Promise<void> {
  const dialog = new WaitingDialog("通信中......");
  props.domDialogs.bind(dialog, waitingDialogConnector);
  await props.api.disconnectWebsocket();
  props.domDialogs.hidden();
}
