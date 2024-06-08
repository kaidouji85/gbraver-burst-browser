import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { waitingDialogConnector } from "../../action-connector/waiting-dialog-connector";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * マッチング中止
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onMatchingCanceled(
  props: Readonly<GameProps>,
): Promise<void> {
  const dialog = new WaitingDialog("通信中......");
  props.domDialogBinder.bind(dialog, waitingDialogConnector);
  await props.api.disconnectWebsocket();
  props.domDialogBinder.hidden();
}

/** アクションタイプ */
const actionType = "MatchingCanceled";

/** マッチング中止のリスナー */
export const matchingCanceledListener = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onMatchingCanceled(props);
  },
};
