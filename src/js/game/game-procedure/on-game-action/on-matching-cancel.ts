import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";

/**
 * マッチング中止
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onMatchingCanceled(props: Readonly<GameProps>): Promise<void> {
  const dialog = new WaitingDialog("通信中......");
  switchWaitingDialog(props, dialog);
  await props.api.disconnectWebsocket();
  props.domDialogBinder.hidden();
}

/** アクションタイプ */
const actionType = "MatchingCanceled";

/** マッチング中止のリスナーコンテナ */
export const matchingCanceledContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onMatchingCanceled(props);
    }
  },
};
