import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { switchNetworkErrorDialog } from "../switch-dialog/switch-network-error-dialog";

/**
 * バトル強制終了時の処理
 * @param props ゲームプロパティ
 * @returns 処理が終了すると発火するPromise
 */
async function onSuddenlyEndBattle(props: Readonly<GameProps>): Promise<void> {
  const dialog = new NetworkErrorDialog({
    ...props,
    postNetworkError: { type: "GotoTitle" },
  });
  switchNetworkErrorDialog(props, dialog);
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
