import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { waitingDialogConnector } from "../../action-connector/waiting-dialog-connector";
import type { GameProps } from "../../game-props";

/**
 * マッチング中止
 *
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function onMatchingCanceled(
  props: Readonly<GameProps>,
): Promise<void> {
  const dialog = new WaitingDialog("通信中......");
  props.domDialogBinder.bind(dialog, waitingDialogConnector);
  await props.api.disconnectWebsocket();
  props.domDialogBinder.hidden();
}
