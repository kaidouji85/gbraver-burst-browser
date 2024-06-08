import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { networkErrorDialogConnector } from "../../action-connector/network-error-dialog-connector";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * バトル強制終了時の処理
 * @param props ゲームプロパティ
 * @returns 処理が終了すると発火するPromise
 */
async function onSuddenlyEndBattle(props: Readonly<GameProps>): Promise<void> {
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

/** バトル強制終了処理のリスナーコンテナ */
export const suddenlyBattleEndContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onSuddenlyEndBattle(props);
  },
};
