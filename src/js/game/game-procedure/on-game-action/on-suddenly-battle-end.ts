import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { networkErrorDialogConnector } from "../../action-connector/network-error-dialog-connector";
import { GameProps } from "../../game-props";
import {GameAction} from "../../game-actions";

/**
 * バトル強制終了時の処理
 * @param props ゲームプロパティ
 * @returns 処理が終了すると発火するPromise
 */
async function onSuddenlyEndBattle(
  props: Readonly<GameProps>,
): Promise<void> {
  const dialog = new NetworkErrorDialog({
    ...props,
    postNetworkError: {
      type: "GotoTitle",
    },
  });
  props.domDialogBinder.bind(dialog, networkErrorDialogConnector(props));
  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
}

/** アクションタイプ */
const actionType = "SuddenlyBattleEnd";

export const suddenlyBattleEndListener = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onSuddenlyEndBattle(props);
  }
}